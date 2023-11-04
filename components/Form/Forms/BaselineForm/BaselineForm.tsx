'use client'

import React, { useState } from 'react'
import styles from './baselineForm.module.css'
import { baselineData, baselineFirstMonth } from './data'
import Button from '@/components/Button/Button'
import { addStudentSurvey, addTeacherSurvey } from '@/services/api/survey'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  first_name: string
  last_name: string
  language: string
  age: number
  gendar: string
  country: 'Nigeria'
  class_id: number
  classarm_id: number
  term: string
  session: string
}

export const BaselineFormStudent = () => {
  const [inputName, setInputName] = useState([])
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const schoolID = Number(useSelector(userData).currentUser?.data?.id!)

  const [payload, setPayload] = useState({
    student_id: studentID,
    school_id: schoolID,
    interested: '',
    opportunity: '',
    ability: '',
    schools_app: '',
    motivates: [],
    prefer: [],
  })

  // // HANDLE INPUT
  // const handleChange = (e, ans, type, name) => {
  //   if (name && type === "checkBox") {
  //     setInputName((current) => [...current, { name: name }]);
  //   }

  //   if (type === "checkBox") {
  //     const data = { ...payload };
  //     data[e.target.name].push(ans);
  //     setPayload(data);
  //   } else {
  //     const data = { ...payload };
  //     data[e.target.name] = ans;
  //     setPayload(data);
  //   }
  // };

  // HANDLE SUBMIT
  const handleFormSubmit = async (data: any) => {
    await addStudentSurvey({
      student_id: studentID,
      school_id: `${schoolID}`,
      interested: payload.interested,
      opportunity: payload.opportunity,
      ability: payload.ability,
      schools_app: payload.schools_app,
      motivates: JSON.stringify(payload.motivates),
      prefer: JSON.stringify(payload.prefer),
      scale_of_1_5: 2,
    })
  }

  // const checkBoxNames = inputName.map((item) => item.name);

  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Baseline Survey</h2>
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
                            // onChange={(e) =>
                            //   handleChange(e, ans.answer, item.type)
                            // }
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
                            // onChange={(e) =>
                            //   handleChange(e, ans.answer, item.type, item.name)
                            // }
                            // required={
                            //   checkBoxNames.includes(item.name) ? false : true
                            // }
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

// TEACHER FORM
export const BaselineFormTeacher = () => {
  // const teacherID = useSelector(
  //   (state) => state?.user?.currentTeacher?.data.teacher_id
  // );
  const teacherID = Number(useSelector(userData).currentTeacher?.data.teacher_id!)
  const schoolID = Number(useSelector(userData).currentTeacher?.data.school?.id!)

  const [number, setnumber] = useState()
  const [payload, setPayload] = useState({
    teacher_id: `${teacherID}`,
    school_id: `${schoolID}`,
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
  // const handleChange = (e, name) => {
  //   const data = { ...payload };
  //   data[name] = e.target.value;
  //   setPayload(data);
  // };

  // HANDLE INPUT
  // const handleChangeNumber = (e, name) => {
  //   const input = e.target.value
  //   const num = input.replace(/[^0-9]/g, "")
  //   setnumber(num)
  //   // const data = { ...payload };
  //   // data[name] = number;
  //   setPayload({...payload, hours: num});
  // };

  // HANDLE SUBMIT
  const handleFormSubmit = (data: any) => {
    addStudentSurvey(data)
  }
  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form2} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Baseline Survey</h2>
          <p className={styles.intro}>
            The Baseline and Endline survey is designed to understand the student learning
            preferences and get information about learning Nigerian languages in class using
            “Izesan! For schools
          </p>
          {baselineData.map((item, index) => (
            <div className={styles.qtnWrap} key={index}>
              <div className={styles.qtn2}>
                <h3>{index + 1}.</h3>
                <p>{item.question}</p>
              </div>
              {item.name === 'hours' ? (
                <textarea
                  name=""
                  id=""
                  value={number}
                  // cols=10
                  // rows="4"
                  // onChange={(e) => handleChangeNumber(e, item?.name)}
                  required
                />
              ) : (
                <textarea
                  name=""
                  id=""
                  // cols="10"
                  // rows="4"
                  // onChange={(e) => handleChange(e, item?.name)}
                  required
                />
              )}
            </div>
          ))}
          <Button text="Submit" />
        </form>
      </div>
    </>
  )
}
