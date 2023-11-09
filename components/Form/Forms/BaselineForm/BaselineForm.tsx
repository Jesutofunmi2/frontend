'use client'

import React, { useState } from 'react'
import styles from './baselineForm.module.css'
import { baselineData, baselineFirstMonth } from './data'
import Button from '@/components/Button/Button'
import { addStudentSurvey, addTeacherSurvey } from '@/services/api/survey'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import Swal from 'sweetalert2'

interface IPayloadForm {
  [index: string]: string | number | any
}
interface BaselineFormProps {
  setSurvey: React.Dispatch<React.SetStateAction<boolean>>
}
export const BaselineFormStudent = ({ setSurvey }: BaselineFormProps) => {
  const [inputName, setInputName] = useState<[] | any>([])
  const studentID = String(useSelector(userData).currentUser?.data?.student_id!)
  const schoolID = useSelector(userData).currentUser?.data?.school.id!

  const [payload, setPayload] = useState<IPayloadForm>({
    student_id: studentID,
    school_id: schoolID,
    interested: '',
    opportunity: '',
    ability: '',
    schools_app: '',
    motivates: [],
    prefer: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answer: string,
    buttonType: string,
    name?: string
  ) => {
    if (name && buttonType === 'checkBox') {
      setInputName((current: any) => [...current, { name: name }])
    }
    if (buttonType === 'checkBox') {
      const data = { ...payload }
      data[e.target.name].push(answer)
      setPayload(data)
    } else {
      const data = { ...payload }
      data[e.target.name] = answer
      setPayload(data)
    }
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res = await addStudentSurvey({
      student_id: studentID,
      school_id: String(schoolID),
      interested: payload.interested,
      opportunity: payload.opportunity,
      ability: payload.ability,
      schools_app: payload.schools_app,
      motivates: JSON.stringify(payload.motivates),
      prefer: JSON.stringify(payload.prefer),
      scale_of_1_5: 2,
    })
    if (res.message) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          setSurvey(true)
        }
      })
    }
  }

  const checkBoxNames = inputName.map((item: { name: string }) => item.name)

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-2xl">Baseline Survey</h2>

          <p className={styles.intro}>
            The Baseline and Endline survey is designed to understand the student learning
            preferences and get information about learning Nigerian languages in class using
            “Izesan! For schools
          </p>

          <div className={styles.questions}>
            {baselineFirstMonth.map((item, indx) => {
              return (
                <div className={styles.qtnWrap} key={indx}>
                  <p className={styles.qtn}>{item.question}</p>

                  {item?.answers.map((ans, index) => (
                    <div className={styles.answers} key={index}>
                      {item.type === 'radio' ? (
                        <div className={styles.inputWrap}>
                          <input
                            // value={payload}
                            type="radio"
                            name={item.name}
                            id="radio"
                            onChange={(e) => handleChange(e, ans.answer, item.type)}
                            className={styles.input}
                            required
                          />
                          <label htmlFor="radio">{ans.answer}</label>
                        </div>
                      ) : (
                        <div className={styles.inputWrap}>
                          <input
                            type="checkbox"
                            name={item.name}
                            id="check"
                            className={styles.input}
                            onChange={(e) => handleChange(e, ans.answer, item.type, item.name)}
                            required={checkBoxNames.includes(item.name) ? false : true}
                          />
                          <label htmlFor="check">{ans.answer}</label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className={styles.btnWrap}>
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

interface IPayloadTeacherForm {
  [index: string]: string | number | any
}
export const BaselineFormTeacher = () => {
  const teacherID = useSelector(userData).currentTeacher?.data.teacher_id!
  const schoolID = useSelector(userData).currentTeacher?.data.school?.id!
  const [number, setNumber] = useState<Number | any>()
  const [payload, setPayload] = useState<IPayloadTeacherForm>({
    teacher_id: teacherID,
    school_id: schoolID,
    years: '',
    hours: null,
    challeges: '',
    opinion: '',
    resources: '',
    confident: '',
    method: '',
    tools: '',
    strategies: '',
    familiar: '',
  })

  // // HANDLE INPUT
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
    const data = { ...payload }
    data[name] = e.target.value
    setPayload(data)
  }

  // HANDLE INPUT
  const handleChangeNumber = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
    const input = e.target.value
    const num = Number(input.replace(/[^0-9]/g, ''))
    setNumber(num)
    setPayload({ ...payload, hours: num })
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res = await addTeacherSurvey(payload)
    if (res.message) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
         
        }
      })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form2} onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-2xl">Baseline Survey</h2>
          <p className={styles.intro}>
            The Baseline and Endline survey is designed to understand the student learning
            preferences and get information about learning Nigerian languages in class using
            “Izesan! For schools
          </p>
          {baselineData.map((item, index) => (
            <div className={styles.qtnWrap} key={index}>
              <div className={styles.qtn2}>
                <h3>{index + 1}.</h3>
                <div>
                  {' '}
                  <p>{item.question}</p>
                  {item.name === 'hours' ? (
                    <textarea
                      name=""
                      id=""
                      onChange={(e) => handleChangeNumber(e, item?.name)}
                      required
                    />
                  ) : (
                    <textarea name="" onChange={(e) => handleChange(e, item?.name)} required />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="ny-6 text-center">
            {' '}
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}
