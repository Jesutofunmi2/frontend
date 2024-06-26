import React from 'react'
import styles from './addClassArmForm.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { addClass, addClassArm } from '@/services/api/school/class'
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { useForm, SubmitHandler, useFieldArray} from 'react-hook-form'
import { ClassArmPayload } from '@/types/classarm'

type Inputs = {
  data: { name: string }[]
}

interface ClassArmFormProps {
  classArmOpen: ClassArmPayload | null
  mutate: any
  setOpenClassArm: React.Dispatch<React.SetStateAction<boolean>>
  schoolID: number
}

const AddClassArmForm = ({
  schoolID,
  classArmOpen,
  setOpenClassArm,
  mutate,
}: ClassArmFormProps) => {
  const handleFormSubmit = async (data: { data: any }, reset: () => void) => {
    let res = await addClassArm({
      school_id: schoolID,
      class_id: classArmOpen?.class_id,
      language_id: classArmOpen?.language_id,
      data: data.data,
    })
    if (res) {
      setOpenClassArm(false)
      reset()
      mutate()
    }
  }

  let renderCount = 0
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      data: [{ name: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleFormSubmit(data, reset)
  }
  renderCount++
  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Add class arm</h3>
        <hr />

        {fields.map((item, index) => (
          <div className={styles.inputWrap} key={index}>
            <TextInput
              register={{ ...register(`data.${index}.name`, { required: true }) }}
              label="Class arm name"
              name={`data.${index}.name`}
              type="text"
              placeholder="Class arm name"
            />

            {index > 0 && (
              <button
                type="button"
                className="absolute right-56 top-6"
                onClick={() => remove(index)}
              >
                <AiOutlineCloseCircle size={25} className={styles.closeIcon} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.addWrap}
          onClick={() =>
            append({
              name: '',
            })
          }
        >
          <span>Add more</span> <AiOutlinePlusCircle size={25} />
        </button>

        <div className={styles.btnWrap}>
          <Button type="submit" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddClassArmForm
