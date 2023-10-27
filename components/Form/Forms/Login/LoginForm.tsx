'use client'
import React, { useState } from 'react'
import styles from './login.module.css'
import Image from 'next/image'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
import { schoolLogin, teacherLogin, studentLogin } from '@/services/Apis/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { setToken } from '@/services/old-apis/token'
import { useDispatch } from 'react-redux'
import { schoolProfile } from '../../../../services/redux/features/userSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [toggleUser, setToggleUser] = useState('school')
  const [inputType, setInputType] = useState('password')
  const [studentData, setStudentData] = useState({
    login_id: '',
    password: '12345678',
  })
  const [teacherData, setTeacherData] = useState({
    teacher_id: '',
    password: '12345678',
  })
  const [schoolData, setschoolData] = useState({
    email: '',
    password: '',
  })

  // TOGGLE USERS
  const handleToggleUser = (event: string) => {
    setToggleUser(event)
  }

  const revealPassword = () => {
    if (inputType === 'password') {
      setInputType('text')
    } else if (inputType === 'text') {
      setInputType('password')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value
    setschoolData({
      ...schoolData,
      [e.target.name]: data,
    })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (toggleUser === 'school') {
        let response = await schoolLogin(schoolData)
        const { token } = response.token
        setToken(token)
        
        dispatch(schoolProfile(response))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        })
        router.push('/school/profile')
      } else if (toggleUser === 'teacher') {
        let response = await teacherLogin(teacherData)
        const { token } = response.token
        setToken(token)
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/teacher')
      } else if (toggleUser === 'student') {
        let response = await studentLogin(studentData)
        const { token } = response.token
        setToken(token)
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/dashboard/languages')
      }
      toast.dismiss()
    } catch (err) {
      if (err) {
        toast.error('Invalid Credentials', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000,
        })
      }
    }
  }
  return (
    <>
      <div className={styles.card}>
        <Image
          src="/assets/images/logo.png"
          width="80"
          height="80"
          alt="logo"
          className={styles.logo}
        />

        <div className={styles.loginAndToggle}>
          <h3>Login</h3>

          <div className={styles.toggleBtn}>
            {/* school button */}
            <button
              className={toggleUser === 'school' ? styles.btnActive : ''}
              onClick={() => handleToggleUser('school')}
            >
              School
            </button>

            {/* student button */}
            <button
              className={toggleUser === 'student' ? styles.btnActive : ''}
              onClick={() => handleToggleUser('student')}
            >
              Student
            </button>

            {/* teacher button */}
            <button
              className={toggleUser === 'teacher' ? styles.btnActive : ''}
              onClick={() => handleToggleUser('teacher')}
            >
              Teacher
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* SIGN IN INPUT */}
          <p>Sign in to your account to continue </p>

          {toggleUser === 'school' ? (
            <>
              <span className={styles.inputWrap}>
                <input
                  defaultValue={schoolData.email}
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                  className={styles.inputfield}
                />
              </span>
              <span className={styles.inputWrap}>
                <input
                  defaultValue={schoolData.password}
                  type={inputType}
                  name="password"
                  required
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  className={styles.inputfield}
                />
                {inputType === 'password' ? (
                  <AiOutlineEye className={styles.revealIcon} onClick={() => revealPassword()} />
                ) : (
                  <AiOutlineEyeInvisible
                    className={styles.revealIcon}
                    onClick={() => revealPassword()}
                  />
                )}
              </span>
            </>
          ) : toggleUser === 'student' ? (
            <>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  required
                  placeholder="Student ID"
                  value={studentData.login_id}
                  onChange={(e) =>
                    setStudentData({
                      ...studentData,
                      login_id: e.target.value,
                    })
                  }
                  className={styles.inputfield}
                />
              </div>
            </>
          ) : (
            toggleUser === 'teacher' && (
              <>
                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    required
                    placeholder="Teacher ID"
                    value={teacherData.teacher_id}
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        teacher_id: e.target.value,
                      })
                    }
                    className={styles.inputfield}
                  />
                </div>
              </>
            )
          )}

          <button type="submit" className={styles.loginBtn}>
            Sign in
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default LoginForm
