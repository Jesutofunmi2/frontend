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
import { getClassArmById } from '@/services/api/school/class'
import Select from '../../FormFields/Select/DropDown'
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

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      {/* <Formik
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
        {({ errors, setFieldValue, values, handleBlur, handleSubmit, handleChange }) => ( */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            register={register}
            label="First name"
            name="first_name"
            type="text"
            placeholder="Enter name"
          />
          <TextInput
            register={register}
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Last name"
          />
          <TextInput
            register={register}
            label="Language"
            name="language"
            type="text"
            placeholder="Enter language"
          />
          <TextInput
            register={register}
            label="Age"
            name="age"
            type="number"
            placeholder="Enter age (number)"
          />

          <Controller
            name="gendar"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(val) => field.onChange(val.value)}
                label="Gender"
                defaultValue={studentDetails?.gendar || 'Select'}
                options={genderOptions}
              />
            )}
          />
          <TextInput
            register={register}
            label="Term"
            name="term"
            type="text"
            placeholder="Enter school term"
          />

          <Controller
            name="session"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(val) => field.onChange(val.value)}
                label="School Session"
                defaultValue={'Select'}
                options={sessionOptions}
              />
            )}
          />

          <Controller
            name="class_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(val) => {
                  field.onChange(val.value), setSelectedOptionForClass(val.value)
                }}
                label="Class"
                defaultValue={'Select'}
                options={classOptions}
              />
            )}
          />

          <Controller
            name="classarm_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(val) => field.onChange(val.value)}
                label="Class Arm"
                defaultValue={'Select'}
                options={classArmoptions}
              />
            )}
          />
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" type="submit" text="Save" />
        </div>
      </form>
      {/* )}
      </Formik> */}
      <ToastContainer />
    </>
  )
}

export default AddEditStudents
