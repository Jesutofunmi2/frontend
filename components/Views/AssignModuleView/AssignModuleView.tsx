import React, { useEffect } from 'react'
import { useState } from 'react'
import { useGetLessons } from '@/services/api/lessons'
import Button from '@/components/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from '../../Form/FormFields/Select/DropDown'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'
import { useGetLanguages } from '@/services/api/languages'

type Inputs = {
  module: ''
  deadline: Date
  no_attempt: number
  time: ''
  mark: number
}

interface AssignModuleViewProps {
  handleModuleSubmit: (data: Inputs | any, reset: (values: any) => void) => void
}
const AssignModuleView = ({ handleModuleSubmit }: AssignModuleViewProps) => {
  const { data: languages } = useGetLanguages()
  const [selectedLanguage, setSelectedLanguage] = useState<number>(0)
  const { data: modulesData, isLoading } = useGetLessons(selectedLanguage)

  const languageOptions = languages?.map((item) => {
    return { value: item?.id, label: item?.name, disabled: item.status === 1 ? false : true }
  })

  let renderCount = 0
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      module: '',
      deadline: new Date(),
      no_attempt: 0,
      time: '',
      mark: 0,
    },
  })
  useEffect(() => {
    reset({
      module: '',
      deadline: new Date(),
      no_attempt: 0,
      time: '',
      mark: 0,
    })
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage)
    } else {
      setSelectedLanguage(0)
    }
  }, [reset, selectedLanguage])

  const moduleOptions = modulesData?.map((item: any) => {
    return { value: item.id, label: item?.title }
  })

  const handleLanguageChange = (selectedLanguage: any) => {
    setSelectedLanguage(selectedLanguage.value)
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleModuleSubmit(data, reset)
  }

  renderCount++
  return (
    <>
      <div>
        <div className="mb-6">
          <Select
            onChange={handleLanguageChange}
            label="Language"
            defaultValue={'Select'}
            options={languageOptions}
          />
        </div>
        {selectedLanguage ? (
          <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="module"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={moduleOptions?.find((c) => c.value === value) || value}
                  onChange={(val) => {
                    onChange(val.value)
                  }}
                  label="Select Module"
                  defaultValue={'Select'}
                  options={moduleOptions}
                  isLoading={isLoading}
                />
              )}
            />

            <div className="w-full my-8">
              <div className="flex w-full justify-between flex-wrap gap-8">
                <TextInput
                  register={{ ...register('deadline', { required: true }) }}
                  label="Deadline"
                  name={`deadline`}
                  type="date"
                  placeholder="Deadline"
                  style={{ width: 350 }}
                />
                <TextInput
                  register={{ ...register('no_attempt', { required: true }) }}
                  label="No Of Attempts"
                  name={`attempts`}
                  type="number"
                  placeholder="No of Attempts"
                  style={{ width: 350 }}
                />
              </div>
              <div className="flex w-full my-8  justify-between flex-wrap gap-8">
                <TextInput
                  register={{ ...register(`time`, { required: true }) }}
                  label="Time(mins)"
                  name={`time`}
                  type="time"
                  placeholder="Time(mins)"
                  style={{ width: 350 }}
                />
                <TextInput
                  register={{ ...register(`mark`, { required: true }) }}
                  label="Mark"
                  name={`mark`}
                  type="number"
                  placeholder="Mark"
                  style={{ width: 350 }}
                />
              </div>
            </div>

            <div className="my-14 text-center">
              <Button text="Submit" type="submit" />
            </div>
          </form>
        ) : null}
      </div>
    </>
  )
}

export default AssignModuleView
