import React, { useEffect, useState } from 'react'
import styles from './addEditTeachers.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { IPayloadTeacher } from '@/types/teacher'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Select from '../../FormFields/Select/DropDown'
import { IClass } from '@/types/class'
import { getClassById } from '@/services/api/school/class'
import { AiOutlineClose } from 'react-icons/ai'
import { Spinner } from '@/components/Loader/Loader'

type Inputs = {
  name: string
  email: string
  address: string
  class_id: number
  classarm_id: number
  image_url: File
}

interface AddEditTeacherProps {
  payloadData: IPayloadTeacher
  setPayloadData: React.Dispatch<React.SetStateAction<IPayloadTeacher>>
  handleFormSubmit: (values: any, data: any, reset: any) => void
  teacherDetails: any
  title: string
  setFile: React.Dispatch<React.SetStateAction<File |null|any>>
  file:File|null|any
  classOptions: any
  schoolID: number
}
const AddEditTeachers = ({
  schoolID,
  handleFormSubmit,
  teacherDetails,
  title,
  file,
  setFile,
  classOptions,
}: AddEditTeacherProps) => {
  const [allClassArmByID, setClassArmByID] = useState<IClass[]>([])
  const [isLoading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | any | null>(null)
  const [isViewSelection, setViewSelection] = useState(false)
  const [selectedOptionForClass, setSelectedOptionForClass] = useState<IClass | any>()
  const [selectedClassAndArm, setSelectedClassAndArm] = useState<
    { class_id: number; classname: string; classarm: string; class_arm_id: number }[]
  >([])

  useEffect(() => {
    if (selectedOptionForClass) {
      setLoading(true)
      const fetchData = async () => {
        try {
          let response = await getClassById(schoolID, selectedOptionForClass.value)
          setClassArmByID(response)
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [selectedOptionForClass])

  const classArmoptions = allClassArmByID[0]?.class_arms.map(
    (item: { id: number; name: string }) => {
      return { label: item?.name, value: item.id }
    }
  )

  const getClassAndClassArmData = (option: any) => {
    let data = {
      class_id: selectedOptionForClass.value,
      class_arm_id: option.value,
      classname: selectedOptionForClass.label,
      classarm: option.label,
    }
    setSelectedClassAndArm([...selectedClassAndArm, data])
  }

  const deleteViewSelectionItem = (itemIndex: number) => {
    let updatedItems = selectedClassAndArm.filter((item: any, index: number) => index !== itemIndex)
    setSelectedClassAndArm(updatedItems)
  }
  const ViewSelections = ({ setViewSelection }: any) => {
    return (
      <div className={styles.viewSelectioWrap}>
        <div className={styles.selectionHeading}>
          <p className={styles.selectionHeadingText}>Classes and Class Arm selection</p>
          <button
            type="button"
            className={styles.iconbuttonClose}
            onClick={() => setViewSelection(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className={styles.viewSelectiolist}>
          {selectedClassAndArm.map((item, index) => {
            return (
              <div className={styles.selectedClassAndArmWrap} key={index}>
                <div className={styles.selectedClassAndArmitems}>
                  <p>
                    <span style={{ fontWeight: 'bold' }}> Classname:</span>{' '}
                    <span> {item.classname}</span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 'bold' }}> Classarm:</span>{' '}
                    <span> {item.classarm}</span>
                  </p>
                </div>
                <button className={styles.deletebtn} onClick={() => deleteViewSelectionItem(index)}>
                  delete
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const { register, handleSubmit, control, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
handleFormSubmit(data,selectedClassAndArm,reset) ,setPreview("")
  }

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.imageWrap}>
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <SelectImage
                register={{ ...register('image_url', { required: true }) }}
                name="image_url"
                setFile={setFile}
                preview={preview}
                setPreview={setPreview}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-6 my-8">
          <TextInput
            register={{ ...register('name', { required: true }) }}
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
          />
          <TextInput
            register={{ ...register('email', { required: true }) }}
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <TextInput
            register={{ ...register('address', { required: true }) }}
            label="Address"
            name="address"
            type="text"
            placeholder="Address"
          />
          <Controller
            name="class_id"
            control={control}
            render={({ field }) => (
              <Select
                onChange={(val) => {
                  field.onChange(val.value), setSelectedOptionForClass(val)
                }}
                label="Class(mutiple selections)"
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
                  onChange={(val) => {
                    field.onChange(val.value), getClassAndClassArmData(val)
                  }}
                  label="Class Arm"
                  defaultValue={'Select'}
                  options={classArmoptions}
                  isLoading={isLoading}
                />
              )}
            />
          )}

          {selectedClassAndArm.length > 0 && (
            <button
              type="button"
              className={styles.viewSeletionBtn}
              onClick={() => setViewSelection(true)}
            >
              View Selections
            </button>
          )}
        </div>
        <div className={styles.btnWrap}>
          <Button type="submit" maxWidth="150px" text="Save" />
        </div>
        {selectedClassAndArm && isViewSelection && (
          <ViewSelections setViewSelection={setViewSelection} />
        )}
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditTeachers
