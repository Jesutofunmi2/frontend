import React, { useEffect, useState } from 'react'
import styles from './addEditTeachers.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { IPayloadTeacher } from '@/types/teacher'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Select from '../../FormFields/Select/DropDown'
import { IClass } from '@/types/class'
import { getClassById } from '@/services/api/school/class'
import { AiOutlineClose } from 'react-icons/ai'

type Inputs = {
  name: string
  email: string
  address: string
  class_id: number | any
  classarm_id: number | any
  image_url: File | any
}

interface AddEditTeacherProps {
  payloadData: IPayloadTeacher
  setPayloadData: React.Dispatch<React.SetStateAction<IPayloadTeacher>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleFormSubmit: (values: any, data: any, reset: (data: any) => void) => void
  teacherDetails: any
  title: string
  setFile: React.Dispatch<React.SetStateAction<File | null | any>>
  file: File | null | any
  classOptions: any
  schoolID: number
}
const AddEditTeachers = ({
  schoolID,
  handleFormSubmit,
  teacherDetails,
  setModalOpen,
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
  }, [schoolID, selectedOptionForClass])

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
    const checkDuplicated = selectedClassAndArm.find(
      (ele) => ele.classname === data.classname && ele.classarm === data.classarm
    )
    if (checkDuplicated) {
      toast.error('Class and Class-arm already selected!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      setSelectedClassAndArm([...selectedClassAndArm, data])
    }
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      class_id: 0,
      classarm_id: 0,
      image_url: '',
    },
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleFormSubmit(data, selectedClassAndArm, reset),
      setPreview(''),
      setSelectedClassAndArm([]),
      setModalOpen(false)
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
                register={{ ...register('image_url') }}
                name="image_url"
                setFile={setFile}
                preview={preview}
                setPreview={setPreview}
                errors={errors}
                clearErrors={clearErrors}
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
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(val) => {
                  onChange(val.value), setSelectedOptionForClass(val)
                }}
                label="Class(mutiple selections)"
                defaultValue={'Select'}
                options={classOptions}
                value={
                  classOptions?.find((c: { value: number; label: string }) => c.value === value) ||
                  value
                }
              />
            )}
          />
          {selectedOptionForClass && (
            <Controller
              name="classarm_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={(val) => {
                    onChange(val.value), getClassAndClassArmData(val)
                  }}
                  value={
                    classArmoptions?.find(
                      (c: { value: number; label: string }) => c.value === value
                    ) || value
                  }
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
          <Button type="submit" text="Save" />
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
