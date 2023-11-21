import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from '../../../FormFields/Select/DropDown'
import { useGetTopics } from '@/services/api/topic'

type Inputs = {
  date: Date
  topic: string
  mark: string
  attachment: File
}
interface AddQuizFormProps {
  handleQuizAssignment: (formdata: any, reset: () => void) => void
}
export default function AddQuizForm({ handleQuizAssignment }: AddQuizFormProps) {
  const { register, handleSubmit, reset, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, reset)
  const { data: topics, isLoading, error, mutate } = useGetTopics()

  const topicOptions = topics?.map((item:any) => {
    return { value: item?.id, label: item?.name, disabled: item.status === 1 ? false : true }
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="topic"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            value={topicOptions?.find((c:any) => c.value === value) || value}
            onChange={(val) => {
              onChange(val.value)
            }}
            label="Select Module"
            defaultValue={'Select'}
            options={topicOptions}
            isLoading={isLoading}
          />
        )}
      />
    </form>
  )
}
