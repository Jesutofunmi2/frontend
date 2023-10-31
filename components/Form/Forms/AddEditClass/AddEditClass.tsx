import React, { useState } from 'react'
import styles from './addEditClass.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from '../../FormFields/Select/DropDown'
// import { useGetLanguages } from '@/services/api/languages'
// import { addClass } from '@/services/api/school/class'
import { useSelector } from 'react-redux'
import { Ilanguage } from '@/types/languages'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  class_room_name: string
  language: any
}

interface AddEditClassProps {
  title: string
  handleFormSubmit: (values: any) => void
  classDetails: any
  languageOptions: { value: number; label: string }[]
}

const AddEditClass = ({
  classDetails,
  title,
  handleFormSubmit,
  languageOptions,
}: AddEditClassProps) => {
  const IDs = useSelector((state) => state?.user?.currentSchool?.data)
  // const { data: language } = useGetLanguages()
  const [payloadData, setPayloadData] = useState({
    school_id: `${IDs?.id}`,
    language_id: '',
    class_room_name: '',
  })

  // SUBMIT FORM CONDITION
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   addClass(payloadData)
  //   setModalOpen(false)
  // }

  // Options for Select component
  // const options = language?.data?.map((item) => {
  //   return { value: item?.id, label: item?.name }
  // })

  // HANDLE INPUT FIELDS
  // const handleChange = (e) => {
  //   const data = { ...payloadData }
  //   data[e.target.name] = e.target.value
  //   setPayloadData(data)
  // }

  // Handle Select change
  // const handlechange = (e) => {
  //   console.log(e.value)
  //   setPayloadData({ ...payloadData, language_id: e.value })
  // }

  // Select component styles
  // const colourStyles = {
  //   control: (baseStyles, state) => ({
  //     ...baseStyles,
  //     borderColor: '#F19C00',
  //     height: '45px',
  //     borderRadius: '15px',
  //     width: '100%',
  //   }),
  // }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.inputWrap}>
          <TextInput
            register={{ ...register('class_room_name', { required: true }) }}
            // defaultValue={classDetails?.first_name}
            label="Class"
            name="class_room_name"
            type="text"
            placeholder="Class Room Name"
          />
          {/* <div>
            <p className={styles.label}>Language</p>
            <Select options={options} onChange={handlechange} styles={colourStyles} />
          </div> */}
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                onChange={(val) => field.onChange(val.value)}
                label="Language"
                defaultValue={'Select'}
                options={languageOptions}
              />
            )}
          />
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditClass
