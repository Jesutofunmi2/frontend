import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Select from '../../../FormFields/Select/DropDown'
import { Spinner } from '@/components/Loader/Loader'
import Button from '@/components/Button/Button'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'
import { TitleCase, formattedDate } from '@/utils'
import { useGetCourses } from '@/services/api/course'
import { ICourses, IVideoLessons, IVideos } from '@/types/videos'
import { useGetVideoCourse } from '@/services/api/videos'
import { PiVideoLight } from 'react-icons/pi'
import Modal from '@/components/Modal/Modal'
type Inputs = {
  language_id: number
  module_id: number
  videos_id: []
  deadline: Date
  time: string
  no_attempt: string
  mark: string
}

interface AddVideoFormProps {
  handleVideoAssignment: (formValues: any, reset: () => void) => void
}
export default function AddVideoForm({ handleVideoAssignment }: AddVideoFormProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [openVideoModal, setOpenVideoModal] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<IVideoLessons[]>([])
  const [selectedPreview, setSelectedPreview] = useState<string>('')
  const [checkedList, setCheckedList] = useState<string[]>([])
  const { data: courseLanguages, isLoading: isLoadingCourses } = useGetCourses()
  const { data: videoCourses, isLoading } = useGetVideoCourse(selectedLanguage)
  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: {
      videos_id: [],
      module_id: 0,
      deadline: new Date(),
      no_attempt: '',
      language_id: 0,
      time: '',
      mark: '',
    },
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {

    handleVideoAssignment(
      {
        ...data,
        mark: Number(data.mark),
        no_attempt: Number(data.no_attempt),
        time: Math.ceil(Number(data.time.split(':')[0])),
      },
      reset
    )
    setSelectedTopic([])
    setCheckedList([])
    setSelectedLanguage('')
  }

  useEffect(() => {
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage)
    }
    if (selectedTopic) {
      setSelectedTopic(selectedTopic)
    }
    if (!openVideoModal) {
      setSelectedPreview('')
    }
  }, [selectedTopic, selectedLanguage, openVideoModal])

  const languageOptions = courseLanguages?.map((video: ICourses) => {
    return { value: video?.id, label: video?.title, disabled: video.status === 1 ? false : true }
  })

  const videoOptions = videoCourses?.map((video: IVideos, index: number) => {
    return { index: index, value: video?.id, label: video?.title, topics: video?.topics }
  })

  return (
    <>
      <h1 className="font-bold text-lg mt-3">Add Video</h1>
      <hr className="border-gray-300" />

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="language_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={languageOptions?.find((c: any) => c.value === value) || value}
              onChange={(val) => {
                onChange(val.value), setSelectedLanguage(val.value), setSelectedTopic([])
              }}
              label="Select Language"
              defaultValue={'Select'}
              options={languageOptions}
              isLoading={isLoadingCourses}
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
                  value={videoOptions?.find((c: any) => c.value === value) || value}
                  onChange={(val) => {
                    onChange(val.value), setSelectedTopic(val.topics)
                  }}
                  label="Select Topics"
                  defaultValue={'Select'}
                  options={videoOptions}
                  isLoading={isLoading}
                />
              )}
            />
            <div className="mt-6 ">
              <h3 className="py-3">Select Video(s)</h3>
              <div className="flex items-start justify-start gap-4 py-8 px-4 flex-wrap h-48 overflow-auto border border-gray-300 rounded-lg p-4">
                {selectedTopic?.length ? (
                  selectedTopic?.map((video: IVideoLessons) => {
                    return (
                      <div className={`p-4 w-60 shadow-xl flex items-center gap-4`} key={video.id}>
                        <input
                          {...register('videos_id', { required: true })}
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
                          value={video.id}
                        />
                        <label
                          htmlFor="check"
                          className={`${
                            checkedList.includes(String(video.id)) ? 'text-yellow' : 'text-black'
                          } w-5/6`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenVideoModal(true), setSelectedPreview(video.media_url)
                            }}
                            className="flex gap-x-4 text-sm items-center text-left justify-center"
                          >
                            {TitleCase(video.title)}
                            <span>
                              <PiVideoLight className="text-2xl" />
                            </span>
                          </button>
                        </label>
                      </div>
                    )
                  })
                ) : isLoading ? (
                  <Spinner />
                ) : null}
              </div>
            </div>
            <div className="flex justify-between items-center flex-wrap my-10 gap-8">
              <TextInput
                register={{ ...register('deadline', { required: true }) }}
                label="Date"
                type="date"
                name="date"
                placeholder="Date"
                min={formattedDate()}
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('time', { required: true }) }}
                label="Time(mins)"
                type="time"
                name="time"
                placeholder="Minutes"
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('no_attempt', { required: true }) }}
                label="No of attempts"
                type="number"
                name="no_attempt"
                placeholder="No of attempts"
                style={{ width: '350px' }}
              />

              <TextInput
                register={{ ...register('mark', { required: true }) }}
                label="Mark"
                type="number"
                name="mark"
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
      <Modal open={openVideoModal} setOpen={setOpenVideoModal}>
        <iframe src={selectedPreview} width={'100%'} height={500} allow="autoplay" />
      </Modal>
    </>
  )
}
