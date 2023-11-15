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
import { schoolData, teacherData, studentData } from '../../../../services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'
import { surveyStatus } from '@/services/redux/features/surveySlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [inputType, setInputType] = useState('password')
  const [isLoading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('School')
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
      if (selectedTab === 'School') {
        let response = await schoolLogin(schoolPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(schoolData(response))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/school/profile')
        setLoading(false)
      } else if (selectedTab === 'Teacher') {
        let response = await teacherLogin(teacherPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(teacherData(response))
        dispatch(surveyStatus(response.data.survey_status))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/teacher')
        setLoading(false)
      } else if (selectedTab === 'Student') {
        let response = await studentLogin(studentPayloadData)
        const { token } = response.token
        setToken(token)
        dispatch(studentData(response))
        dispatch(surveyStatus(response.data.survey_status))
        toast.loading('Signing you in...', {
          position: toast.POSITION.TOP_CENTER,
        })
        router.push('/dashboard/languages')
        setLoading(false)
      }
      toast.dismiss()
    } catch (err: any) {
      setLoading(false)
      if (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    }
  }
  return (
    <div className="md:w-5/6 my-12 mx-auto rounded-l-xl shadow-2xl flex justify-center items-start">
      <div className="hidden lg:flex bg-brown w-1/2 h-screen relative fel-col items-center justify-center rounded-xl">
        <div className="absolute top-10 -left-8 bg-yellow px-10 rounded-xl py-2">
          <p className="text-white font-bold text-[28px]">Welcome back!</p>
        </div>
        <Image
          src={'/assets/images/landingpage/login_welcome.svg'}
          height={100}
          width={100}
          className="h-[24em] 2xl:h-[40em] w-auto"
          alt="login_bg"
        />
      </div>
      <div className="w-full lg:w-1/2 bg-white p-4 md:p-16">
        <div className="flex items-center justify-center text-brown gap-10">
          <hr className="border-brown border-[2px] w-20" />
          <h1 className="font-bold text-3xl">Login</h1>
          <hr className="border-brown border-[2px] w-20" />
        </div>
        <div className="my-10 flex items-center text-lg flex-wrap justify-center font-bold text-brown gap-5">
          {['School', 'Student', 'Teacher'].map((tab) => {
            return (
              <button
                onClick={() => setSelectedTab(tab)}
                className={`${
                  selectedTab === tab ? 'bg-brown' : 'bg-yellow'
                } px-6 py-2 text-white rounded-lg text-lg`}
                key={tab}
              >
                {tab}
              </button>
            )
          })}
        </div>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <p className="text-yellow text-center text-lg">Sign in to your account to continue.</p>
          {selectedTab === 'School' ? (
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
          ) : selectedTab === 'Student' ? (
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
            selectedTab === 'Teacher' && (
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
          <div className="text-center mt-12">
            <button type="submit" className={styles.loginBtn}>
              SIGN IN
            </button>
          </div>
        </form>
        <ToastContainer autoClose={5000} />
      </div>
      {isLoading ? <Loader /> : null}
    </div>
  )
}

export default LoginForm
