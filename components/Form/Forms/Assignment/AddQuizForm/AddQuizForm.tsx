import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from '../../../FormFields/Select/DropDown'
import { useGetTopics } from '@/services/api/topic'
import { useGetLanguages } from '@/services/api/languages'
import { useGetLessonQuestions } from '@/services/api/lessonGame'
import { Spinner } from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'
import { formattedDate } from '@/utils'
import { ITopics } from '@/types/topics'
import { ILanguage } from '@/types/languages'


type Inputs = {
  language_id: number
  module_id: string
  questions_id: []
  deadline: Date
  time: number
  no_attempt: string
  mark: string
}
interface AddQuizFormProps {
  handleQuizAssignment: (formdata: any, reset: () => void) => void
}
export default function AddQuizForm({ handleQuizAssignment }: AddQuizFormProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const { data: languages } = useGetLanguages()
  const { data: topics, isLoading } = useGetTopics(selectedLanguage)
  const {
    data: lessonQuestions,
    isLoading: isLoadingQuestions,
    error,
  } = useGetLessonQuestions(selectedLanguage, selectedTopic)
  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: {
      questions_id: [],
      module_id: '',
      deadline: new Date(),
      no_attempt: '',
      language_id: 0,
      time: 0,
      mark: '',
    },
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleQuizAssignment(
      {
        ...data,
        mark: Number(data.mark),
        no_attempt: Number(data.no_attempt),
      },
      reset
    )
    setSelectedTopic(0)
    setCheckedList([])
    setSelectedLanguage(0)
  }

  useEffect(() => {
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage)
    }
    if (selectedTopic) {
      setSelectedTopic(selectedTopic)
    }
  }, [selectedTopic, selectedLanguage])

  const languageOptions = languages?.map((language:ILanguage) => {
    return { value: language?.id, label:language?.name, disabled: language.status === 1 ? false : true }
  })
  
  const topicOptions = topics?.map((topic: ITopics, index: number) => {
    return { index: index, value: topic?.id, label: topic?.title }
  })


  return (
    <>
      <h1 className="font-bold text-lg mt-3">Add Module</h1>
      <hr className="border-gray-300" />

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="language_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={languageOptions?.find((c: any) => c.value === value) || value}
              onChange={(val) => {
                onChange(val.value), setSelectedLanguage(val.value)
              }}
              label="Select Language"
              defaultValue={'Select'}
              options={languageOptions}
            />
          )}
        />
        {selectedLanguage ? (
          <div className="mt-6">
            <Controller
              name="module_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={topicOptions?.find((c: any) => c.value === value) || value}
                  onChange={(val) => {
                    onChange(val.value), setSelectedTopic(val.value)
                  }}
                  label="Select Topic"
                  defaultValue={'Select'}
                  options={topicOptions}
                  isLoading={isLoading}
                />
              )}
            />
            <div className="mt-6 ">
              <h3 className="py-3">Select Question(s)</h3>
              <div className="flex items-center justify-start gap-7 py-8 px-6 flex-wrap h-48 overflow-auto border border-gray-300 rounded-lg p-4">
                {lessonQuestions?.length ? (
                  lessonQuestions?.map((ele: any) => {
                    return (
                      <div className={`p-4 shadow-xl flex items-center text-sm gap-4 w-52`} key={ele.id}>
                        <input
                          {...register('questions_id', { required: true })}
                          type="checkbox"
                          required={!checkedList.length}
                          onChange={(val) => {
                            if (val.target.checked) {
                              setCheckedList([...checkedList, val.target.value])
                            } else {
                              setCheckedList((current: string[]) =>
                                current.filter((ele) => ele !== val.target.value)
                              )
                            }
                          }}
                          value={ele.id}
                        />
                        <label
                          htmlFor="check"
                          className={`${
                            checkedList.includes(ele.id) ? 'text-yellow' : 'text-black'
                          } w-5/6`}
                        >
                          {ele.title}
                        </label>
                      </div>
                    )
                  })
                ) : isLoadingQuestions ? (
                  <Spinner />
                ) : null}
              </div>
            </div>
            <div className="flex justify-between items-center flex-wrap my-10 gap-8">
              <TextInput
                register={{ ...register('deadline', { required: true }) }}
                label="Deadline"
                type="date"
                name="date"
                placeholder="Date"
                min={formattedDate()}
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('time', { required: true }) }}
                label="Duration(mins)"
                type="number"
                name="time"
                min="0"
                placeholder="mins"
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('no_attempt', { required: true }) }}
                label="No of attempts"
                type="number"
                min="0"
                name="no_attempt"
                placeholder="No of attempts"
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('mark', { required: true }) }}
                label="Mark"
                type="number"
                name="mark"
                min="0"
                placeholder="Mark"
                style={{ width: '350px' }}
              />
            </div>
            <div className="ny-6 text-center">
              {' '}
              <Button text="Submit" type="submit" />
            </div>
          </div>
        ) : null}
      </form>

    </>
  )
}
