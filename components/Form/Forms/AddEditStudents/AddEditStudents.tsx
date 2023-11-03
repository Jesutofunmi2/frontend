import React, { useEffect, useState } from 'react'
import styles from './addEditStudents.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IClass } from '@/types/class'
import * as yup from 'yup'
import { getClassById } from '@/services/api/school/class'
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
  schoolID: number
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
  
  const [isLoading, setLoading] = useState(false)
  const [allClassArmByID, setClassArmByID] = useState<IClass[]>([])
  const [selectedOptionForClass, setSelectedOptionForClass] = useState<IClass | any>()

  useEffect(() => {
    if (selectedOptionForClass) {
      setLoading(true)
      const fetchData = async () => {
        try {
          let response = await getClassById(schoolID, selectedOptionForClass)
          setClassArmByID(response)
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [schoolID,selectedOptionForClass])

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

  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            register={{ ...register('first_name', { required: true }) }}
            label="First name"
            name="first_name"
            type="text"
            placeholder="Enter name"
            defaultValue={studentDetails? studentDetails.username:""}
                     />
          <TextInput
            register={{ ...register('last_name', { required: true }) }}
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Last name"
            defaultValue={studentDetails? studentDetails.last_name:""}
          />
          <TextInput
            register={{ ...register('language', { required: true }) }}
            label="Language"
            name="language"
            type="text"
            placeholder="Enter language"
            defaultValue={studentDetails? studentDetails.language:""}
          />
          <TextInput
            register={{ ...register('age', { required: true }) }}
            label="Age"
            name="age"
            type="number"
            placeholder="Enter age (number)"
            defaultValue={studentDetails? studentDetails.age:""}
          />

          <Controller
            name="gendar"
            control={control}
            render={({ field }) => (
              <Select
                onChange={(val) => field.onChange(val.value)}
                label="Gender"
                defaultValue={genderOptions.find(({ value }) => value == "Male")}
                options={genderOptions}
              />
            )}
          />
          <TextInput
            register={{ ...register('term', { required: true }) }}
            label="Term"
            name="term"
            type="text"
            placeholder="Enter school term"
            defaultValue={studentDetails? studentDetails.term:""}
          />

          <Controller
            name="session"
            control={control}
            render={({ field }) => (
              <Select
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
                onChange={(val) => {
                  field.onChange(val.value), setSelectedOptionForClass(val.value)
                }}
                label="Class"
                defaultValue={'Select'}
                options={classOptions}
              />
            )}
          />
     {selectedOptionForClass && (
          <Controller
            name="classarm_id"
            control={control}
            render={({ field }) => (
              <Select
                onChange={(val) => field.onChange(val.value)}
                label="Class Arm"
                defaultValue={'Select'}
                options={classArmoptions}
                isLoading={isLoading}
              />
            )}
          />
          )}
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" type="submit" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditStudents
