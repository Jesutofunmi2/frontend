'use client'

import React, { useState } from 'react'
import styles from './login.module.css'
import Image from 'next/image'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { schoolLogin, teacherLogin, studentLogin } from '@/services/apis/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { setToken } from '@/services/Apis/token'

const LoginForm = () => {
  const router = useRouter()
  const [toggle, setToggle] = useState('school')
  const [inputType, setInputType] = useState('password')
  const [studentData, setStudentData] = useState({
    login_id: '',
    password: '12345678',
  })
  const [teacherData, setTeacherData] = useState({
    login_id: '',
    password: '12345678',
  })
  const [schoolData, setschoolData] = useState({
    email: '',
    password: '',
  })

  // TOGGLE USERS
  const handleToggle = (event: string) => {
    setToggle(event)
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

  // SUBMIT LOGIN CONDITION
  const handleSubmit = async (event) => {
    event.preventDefault();
  //  e.stopImmediatePropagation
    try {
      if (toggle === 'school') {
        let response = await schoolLogin(schoolData)
        const { token } = response.token
        setToken(token)
        // toast.loading('Signing you in...', {
        //   position: toast.POSITION.TOP_CENTER,
        // })
        router.push('/school/profile')
      } else if (toggle === 'teacher') {
        let response = await teacherLogin(teacherData)
        const { token } = response.token
        setToken(token)
        // toast.loading('Signing you in...', {
        //   position: toast.POSITION.TOP_CENTER,
        // })
        router.push('/teacher')
      } else if (toggle === 'student') {
        let response = await studentLogin(studentData)
        const { token } = response.token
        setToken(token)
        // toast.loading('Signing you in...', {
        //   position: toast.POSITION.TOP_CENTER,
        // })
        router.push('/dashboard/languages')
      }
    } catch (err) {
      console.log(err)
      // toast.dismiss()
      // if (err) {
      //   toast.error('Invalid Credentials', {
      //     position: toast.POSITION.TOP_CENTER,
      //   })
      // }
    } finally {
      // toast.dismiss()
    }
  }
  return (
    <>
      <div className={styles.card}>
        {/* LOGO */}
        <Image
          src="/assets/images/logo.png"
          width="80"
          height="80"
          alt="logo"
          className={styles.logo}
        />

        <div className={styles.loginAndToggle}>
          <h3>Login</h3>

          {/* TOOGLE BUTTONS */}
          <div className={styles.toggleBtn}>
            {/* school button */}
            <button
              className={toggle === 'school' ? styles.btnActive : ''}
              onClick={() => handleToggle('school')}
            >
              School
            </button>

            {/* student button */}
            <button
              className={toggle === 'student' ? styles.btnActive : ''}
              onClick={() => handleToggle('student')}
            >
              Student
            </button>

            {/* teacher button */}
            <button
              className={toggle === 'teacher' ? styles.btnActive : ''}
              onClick={() => handleToggle('teacher')}
            >
              Teacher
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* SIGN IN INPUT */}
          <p>Sign in to your account to continue </p>

          {toggle === 'school' ? (
            // IF TOGGLE IS EQUAL TO SCHOOL, SHOW EMAIL AND PASSWORD INPUT
            <>
              <span className={styles.inputWrap}>
                <input
                  defaultValue={schoolData.email}
                  type="email"
                  name="email"
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
          ) : toggle === 'student' ? (
            // ELSE FOR ONLY LOGIN ID INPUT
            <>
              <div className={styles.inputWrap}>
                <input
                  type="text"
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
            toggle === 'teacher' && (
              <>
                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    placeholder="Teacher ID"
                    value={teacherData.login_id}
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        login_id: e.target.value,
                      })
                    }
                    className={styles.inputfield}
                  />
                </div>
              </>
            )
          )}

          {/* SUBMIT BUTTON */}
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
