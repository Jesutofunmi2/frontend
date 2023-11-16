import React from 'react'
import styles from './assignModuleView.module.css'
import { useState } from 'react'
import { useGetLessons } from '@/services/api/lessons'
import Button from '@/components/Button/Button'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import Select from '../../Form/FormFields/Select/DropDown'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'

type Inputs = {
  module: ''
  data: { deadline: Date; attempts: ''; time: ''; mark: '' }[]
}
interface IOptions {
  id: number
  value: string
  label: string
}

interface AssignModuleViewProps {
  handleModuleSubmit: (
    selectedModules: IOptions[],
    data: Inputs | any,
    reset: (values: any) => void
  ) => void
}
const AssignModuleView = ({ handleModuleSubmit }: AssignModuleViewProps) => {
  const { data: lessonData } = useGetLessons(1) //to to balogun
  const [selectedModules, setSelectedModules] = useState<IOptions[]>([])
  const options = lessonData?.map((item) => {
    return { id: item.id, value: item.title, label: item?.title }
  })

  let renderCount = 0
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      module: '',
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  })
  const handleChange = (selectedValue: IOptions) => {
    setSelectedModules([...selectedModules, selectedValue])
    append({
      deadline: new Date(),
      attempts: '',
      time: '',
      mark: '',
    })
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleModuleSubmit(selectedModules, data, reset)
  }
  renderCount++

  return (
    <>
      <div>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="module"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                value={options?.find((c) => c.value === value) || value}
                onChange={(val) => {
                  onChange(val.value), handleChange(val)
                }}
                label="SELECT MODULE"
                defaultValue={value}
                options={options}
              />
            )}
          />

          <div className="my-16">
            {fields.length ? (
              <span className="text-xs">(Complete the selected modules)</span>
            ) : null}

            <div className="flex gap-4 flex-wrap items-center justify-between">
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div className="shadow-lg p-6 w-[22em] relative ">
                    <p className="my-5 font-bold text-xl">{selectedModules[index].value}</p>

                    <div className="flex justify-between flex-wrap gap-6">
                      <TextInput
                        register={{ ...register(`data.${index}.deadline`, { required: true }) }}
                        label="Deadline"
                        name={`data.${index}.deadline`}
                        type="date"
                        placeholder="Deadline"
                        style={{ width: '140px' }}
                      />

                      <TextInput
                        register={{ ...register(`data.${index}.attempts`, { required: true }) }}
                        label="Attempts"
                        name={`data.${index}.attempts`}
                        type="number"
                        placeholder="No of Attempts"
                        style={{ width: '140px' }}
                      />
                      <TextInput
                        register={{ ...register(`data.${index}.time`, { required: true }) }}
                        label="Time"
                        name={`data.${index}.time`}
                        type="number"
                        placeholder="Time"
                        style={{ width: '140px' }}
                      />
                      <TextInput
                        register={{ ...register(`data.${index}.mark`, { required: true }) }}
                        label="Mark"
                        name={`data.${index}.mark`}
                        type="number"
                        placeholder="Mark"
                        style={{ width: '140px' }}
                      />
                    </div>

                    {/* <button
                        type="button"
                        onClick={() => removeModules()}
                        className="absolute top-10 right-5"
                      >
                        {' '}
                        {index}
                        <TbTrash className="text-base" />
                      </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* )} */}

          {fields.length ? (
            <div className="my-6 text-center">
              <Button text="Submit" type="submit" />
            </div>
          ) : null}
        </form>
      </div>
    </>
  )
}

export default AssignModuleView
