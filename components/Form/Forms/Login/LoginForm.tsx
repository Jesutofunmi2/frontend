'use client'
import React, { useState } from 'react'
import styles from './login.module.css'
import Image from 'next/image'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
import { schoolLogin, teacherLogin, studentLogin } from '@/services/api/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { setToken } from '@/services/api/token'
import { useDispatch } from 'react-redux'
import { schoolData, teacherData ,studentData} from '../../../../services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [toggleUser, setToggleUser] = useState('school')
  const [inputType, setInputType] = useState('password')
  const [isLoading, setLoading] = useState(false)
  const [studentPayloadData, setStudentPayloadData] = useState({
    login_id: '',
    password: '12345678',
  })
  const [teacherPayloadData, setTeacherPayloadData] = useState({
    teacher_id: '',
    password: '12345678',
  })
  const [schoolPayloadData, setSchoolPayloadData] = useState({
    email: '',
    password: '',
  })
  if(isLoading) return <Loader/>

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
    setSchoolPayloadData({
      ...schoolPayloadData,
      [e.target.name]: data,
    })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      if (toggleUser === 'school') {
        let response = await schoolLogin(schoolPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(schoolData(response))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/school/profile')
        setLoading(false)
      } else if (toggleUser === 'teacher') {
        let response = await teacherLogin(teacherPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(teacherData(response))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/teacher')
        setLoading(false)
      } else if (toggleUser === 'student') {
        let response = await studentLogin(studentPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(studentData(response))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/dashboard/languages')
        setLoading(false)
      }
    } catch (err: any) {

      setLoading(false)
      if (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    } finally {
      toast.dismiss()
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
                  value={studentPayloadData.login_id}
                  onChange={(e) =>
                    setStudentPayloadData({
                      ...studentPayloadData,
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
                    value={teacherPayloadData.teacher_id}
                    onChange={(e) =>
                      setTeacherPayloadData({
                        ...teacherPayloadData,
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
            SIGN IN
          </button>
        </form>
        <ToastContainer autoClose={5000} />
      </div>
    </>
  )
}

export default LoginForm
