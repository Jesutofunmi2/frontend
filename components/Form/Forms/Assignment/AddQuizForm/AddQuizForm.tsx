import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from '../../../FormFields/Select/DropDown'

type Inputs = {
  date: Date
  topic: string
  mark: string
  attachment: File
}
interface AddQuizFormProps {
  handleQuizAssignment: (formdata: any, reset: () => void) => void
  topics: any
}
export default function AddQuizForm({ handleQuizAssignment, topics }: AddQuizFormProps) {
  const [questionLists, setQuestionLists] = useState<[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [checked, setChecked] = useState<number[]>([])
  const { register, handleSubmit, reset, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data, reset)

  useEffect(() => {
    if (selectedIndex) {
      setQuestionLists(topics[selectedIndex].questions)
    } else {
      setQuestionLists([])
    }
  }, [selectedIndex])

  const topicOptions = topics?.map((item: any, index: number) => {
    return { index: index, value: item?.id, label: item?.title }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(index)
    // let prev = checked
    // let itemIndex = prev.indexOf(selectedIndex)
    // if (itemIndex !== -1) {
    //   prev.splice(itemIndex, 1)
    // } else {
    //   prev.push(selectedIndex)
    // }
    // setChecked([...prev])
    // setInputName((current: any) => [...current, id])
  }

  // const checkBoxNames = questionLists.map((item: { name: string }) => item.name)
  console.log(checked)
  return (
    <>
      <h1 className="font-bold text-lg mt-3">Add Module</h1>
      <hr className="border-gray-300" />

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="topic"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={topicOptions?.find((c: any) => c.value === value) || value}
              onChange={(val) => {
                onChange(val.value), setSelectedIndex(val.index)
              }}
              label="Select Topic"
              defaultValue={'Select'}
              options={topicOptions}
              // isLoading={isLoading}
            />
          )}
        />
        <div className="mt-6 ">
          <h3 className="py-3">Select Question(s)</h3>
          <div className="flex items-center gap-4 flex-wrap h-48 overflow-auto border border-gray-300 rounded-lg p-4">
            {questionLists.map((ele: any, index: number) => {
              return (
                <div className={`p-4 shadow-xl flex items-center gap-4`} key={ele.id}>
                  <input
                    type="checkbox"
                    name={ele.title}
                    id="check"
                    onChange={(e) => handleChange(e, index)}
                    checked={checked.includes(ele.id)}
                  />
                  <label htmlFor="check">{ele.title}</label>
                </div>
              )
            })}
          </div>
        </div>
      </form>
    </>
  )
}
