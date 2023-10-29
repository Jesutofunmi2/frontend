import React from 'react'
import styles from './addEditStudents.module.css'
import TextInput from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from '../../FormFields/Select/Select'
import Select2 from '../../FormFields/Select/select2'
import { IClass } from '@/types/class'
import { IFormStudent } from '@/types/student'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { SingleValue } from 'react-select'

interface Options {
  label: string
  value: number
}
interface AddEditStudentsProps {
  title: string
  handleFormSubmit: (values: any) => void
  schoolID: number
  studentDetails: any
  classOptions: any
  classArmoptions: Options[]
  setSelectedOptionForClass: React.Dispatch<React.SetStateAction<IClass | any>>
  selectedOptionForClass: any
}
const AddEditStudents = ({
  schoolID,
  handleFormSubmit,
  studentDetails,
  title,

  classOptions,
  setSelectedOptionForClass,
  classArmoptions,
  selectedOptionForClass,
}: AddEditStudentsProps) => {
  const validationSchema = yup.object().shape({
    first_name: yup.string().required('Enter First Name'),
    last_name: yup.string().required('Enter Last Name'),
    language: yup.string().required('Enter your language'),
    gendar: yup.string().required('Enter Gender'),
    age: yup.number().required('Enter Age'),
    country: yup.string().required('Enter your country'),
    class_id: yup.number().required('Select your class'),
    classarm_id: yup.string().required('Select your class Arm'),
    term: yup.string().required('Select your term'),
    session: yup.string().required('Select your class session'),
  })

  // const handleSelectchange = (newValue: SingleValue<Options>) => {
  //   setSelectedOptionForClass(newValue?.value)
  // }
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const data = e.target.value
  //   setPayloadData({
  //     ...payloadData,
  //     [e.target.name]: data,
  //   })
  // }

  // GENDER SELECT OPTIONS
  const genderOptions = ['Male', 'Female']

  // COUNTRY SELECT OPTIONS
  const sessionOptions = ['2023/2024']

  return (
    <>
      <Formik
        initialValues={{
          school_id: schoolID,
          first_name: '',
          last_name: '',
          language: '',
          age: 0,
          gendar: '',
          country: 'Nigeria',
          class_id: 0,
          classarm_id: '',
          term: '',
          session: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values: IFormStudent) => {
          handleFormSubmit(values)
        }}
      >
        {({ errors, touched, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit} className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <hr />

            <div className={styles.inputWrap}>
              <TextInput
                defaultValue={studentDetails?.username}
                title="First name"
                name="first_name"
                handleChange={handleChange}
                type="text"
                placeholder="Enter name"
              />
              <TextInput
                title="Last Name"
                name="last_name"
                handleChange={handleChange}
                type="text"
                defaultValue={studentDetails?.last_name}
                placeholder="Last name"
              />
              <TextInput
                defaultValue={studentDetails?.language}
                title="Language"
                name="language"
                handleChange={handleChange}
                type="text"
                placeholder="Enter language"
              />
              <TextInput
                title="Age"
                name="age"
                handleChange={handleChange}
                defaultValue={studentDetails?.age}
                type="number"
                placeholder="Enter age (number)"
              />
              <Select
                name="gendar"
                title="Gender"
                option={genderOptions}
                handleChange={handleChange}
                defaultValue={studentDetails?.gendar}
              />
              <TextInput
                title="Term"
                name="term"
                handleChange={handleChange}
                type="text"
                defaultValue={studentDetails?.term}
                placeholder="Enter school term"
              />

              <Select
                name="session"
                title="Session"
                option={sessionOptions}
                handleChange={handleChange}
                defaultValue={studentDetails?.gendar}
              />
              <Select2
                handleChange={(newValue) => setSelectedOptionForClass(newValue?.value)}
                title="Class"
                classOptions={classOptions}
                value={selectedOptionForClass?.classs_room_name}
              />

              {selectedOptionForClass ? (
                <div className={styles.selectWrap}>
                  <span>Class Arm</span>
                  <select
                    name="classarm_id"
                    className={styles.select}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option value="">Select</option>
                    {classArmoptions?.map((item: any) => (
                      <option value={item.value} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
            <div className={styles.btnWrap}>
              <Button maxWidth="150px" type="submit" text="Save" />
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  )
}

export default AddEditStudents
