import React, { useEffect, useState } from 'react'
import styles from './addEditStudents.module.css'
import TextInput from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IClass } from '@/types/class'
import { IFormStudent } from '@/types/student'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { getClassArmById } from '@/services/api/class'
import Select from '../../FormFields/Select/DropDown'


interface AddEditStudentsProps {
  title: string
  handleFormSubmit: (values: any) => void
  schoolID: string
  studentDetails: any
  classOptions: any
  
}
const AddEditStudents = ({
  schoolID,
  handleFormSubmit,
  studentDetails,
  title,
  classOptions,
}: AddEditStudentsProps) => {
  const validationSchema = yup.object().shape({
    first_name: yup.string().required('Enter First Name'),
    last_name: yup.string().required('Enter Last Name'),
    language: yup.string().required('Enter your language'),
    // gendar: yup.string().required('Enter Gender'),
    age: yup.number().required('Enter Age'),
    // class_id: yup.number().required('Select your class'),
    // classarm_id: yup.number().required('Select your class Arm'),
    term: yup.string().required('Select your term'),
    // session: yup.string().required('Select your class session'),
  })

  const [allClassArmByID, setClassArmByID] = useState<IClass[]>([])
  const [selectedOptionForClass, setSelectedOptionForClass] = useState<IClass | any>()

  useEffect(() => {
    if (selectedOptionForClass) {
      const fetchData = async () => {
        try {
          let response = await getClassArmById(schoolID, selectedOptionForClass)
          setClassArmByID(response)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [selectedOptionForClass])

  console.log(studentDetails)
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'female' },
  ]
  const sessionOptions = [{ value: '2023/2024', label: '2023/2024' }]

  const classArmoptions = allClassArmByID[0]?.class_arms.map(
    (item: { id: number; name: string }) => {
      return { label: item?.name, value: item.id }
    }
  )

  return (
    <>
      <Formik
        initialValues={
          studentDetails
            ? { 
                first_name: studentDetails.username,
                last_name: studentDetails.last_name,
                language: studentDetails.language,
                age: studentDetails.age,
                gendar: studentDetails.gendar,
                country: studentDetails.country,
              }
            : {
                school_id: String(schoolID),
                first_name: '',
                last_name: '',
                language: '',
                age: 0,
                gendar: '',
                country: 'Nigeria',
                class_id: 0,
                classarm_id: 0,
                term: '',
                session: '',
              }
        }
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          // console.log(values)
          handleFormSubmit(values)
        }}
      >
        {({ errors, setFieldValue, values, handleBlur, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <hr />

            <div className={styles.inputWrap}>
              <TextInput
                handleChange={handleChange}
                label="First name"
                name="first_name"
                id="first_name"
                type="text"
                placeholder="Enter name"
              />
              <TextInput
                handleChange={handleChange}
                label="Last Name"
                name="last_name"
                id="last_name"
                type="text"
                placeholder="Last name"
              />
              <TextInput
               handleChange={handleChange}
                label="Language"
                name="language"
                id="language"
                type="text"
                placeholder="Enter language"
              />
              <TextInput
                label="Age"
                name="age"
                id="age"
                handleChange={handleChange}
                type="number"
                placeholder="Enter age (number)"
              />

              <Select
                label="Gender"
                defaultValue={studentDetails?.gendar || 'Select'}
                id="gendar"
                value={values.gendar}
                options={genderOptions}
                onChange={(option) => setFieldValue('gendar', option)}
                onBlur={handleBlur}
              />
              <TextInput
                label="Term"
                onChange={handleChange}
                name="term"
                type="text"
                placeholder="Enter school term"
              />

              <Select
                label="School Session"
                id="session"
                defaultValue={values.session || 'Select'}
                value={values.session}
                options={sessionOptions}
                onChange={(option) => setFieldValue('session', option)}
                onBlur={handleBlur}
              />

              <Select
                label="Class"
                defaultValue={'Select'}
                id="class_id"
                value={values.class_id}
                onChange={(option) => {
                  setFieldValue('class_id', option), setSelectedOptionForClass(option?.value)
                }}
                options={classOptions}
                onBlur={handleBlur}
              />

              <Select
                defaultValue={ 'Select'}
                label="Class Arm"
                id="classarm_id"
                value={values.classarm_id}
                onChange={(option) => setFieldValue('classarm_id', option)}
                options={classArmoptions}
                onBlur={handleBlur}
              />
            </div>
            <div className={styles.btnWrap}>
              <Button maxWidth="150px" type="submit" text="Save" />
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  )
}

export default AddEditStudents
