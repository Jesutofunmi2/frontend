'use client'

import React, { useEffect, useState } from 'react'
import styles from './bulkUpload.module.css'
import { AiOutlineFileAdd } from 'react-icons/ai'
import Button from '../Button/Button'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Select from '../Form/FormFields/Select/DropDown'
import { TextInput } from '../Form/FormFields/TextInput/TextInput'
import { IClass } from '@/types/class'
import { getClassById } from '@/services/api/school/class'
import { bulkAddStudent } from '@/services/api/school/student'
import { BiDownload, BiErrorCircle } from 'react-icons/bi'
import { TitleCase } from '@/utils'

type Inputs = {
  class_id: number | any
  classarm_id: number | any
  term: string
  session: string
  file: File
}

interface BulkUploadProps {
  mutate: any
  schoolID: number
  classOptions:
  | {
    value: number
    label: string
  }[]
  | any
  setBulkOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const BulkUpload = ({ schoolID, mutate, classOptions, setBulkOpen }: BulkUploadProps) => {
  const [file, setFile] = useState<File | any>()
  const [selectedFile, setSelectedFile] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [allClassArmByID, setClassArmByID] = useState<IClass[]>([])
  const [selectedOptionForClass, setSelectedOptionForClass] = useState<IClass | any>()

  useEffect(() => {
    if (selectedOptionForClass) {
      setLoading(true)
      const fetchData = async () => {
        try {
          let response = await getClassById(schoolID, selectedOptionForClass)
          setClassArmByID(response)
          setLoading(false)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [schoolID, selectedOptionForClass])
  const sessionOptions = [{ value: 2023, label: '2023/2024' }]
  const termOptions = [
    { value: 'First', label: 'First Term' },
    { value: 'Second', label: 'Second Term' },
    { value: 'Third', label: 'Third Term' },
  ]

  const classArmoptions = allClassArmByID[0]?.class_arms.map(
    (item: { id: number; name: string }) => {
      return { label: item?.name, value: item.id }
    }
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(false)
    if (e.target !== null && e.target.files !== null) {
      setFile(e.target.files[0])
      setSelectedFile(e.target.files[0].name)
    }
  }
  const handleBulkUpload = async (data: Inputs) => {
    setBulkOpen(false)
    let formData: any = new FormData()
    formData.append('school_id', String(schoolID))
    formData.append('class_id', data.class_id)
    formData.append('class_arm_id', data.classarm_id)
    formData.append('term', TitleCase(data.term))
    formData.append('session', data.session)
    formData.append('batch_file', file)
    await bulkAddStudent(formData)
    setFile('')
    setSelectedFile('')
    mutate()
  }

  const { handleSubmit, control, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.file) {
      setFileUploadError(true)
    } else {
      handleBulkUpload(data)
      reset({ term: '', class_id: 0, classarm_id: 0, session: '' })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className="text-lg mb-4 font-bold">Bulk Registration</h3>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-20 justify-between">
            <div className="w-3/6">
              <div className="my-6">
                <div className="my-6">
                  <Controller
                    name="term"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={(val) => onChange(val.value)}
                        value={termOptions.find((c) => c.value === value) || value}
                        label="School Term"
                        defaultValue={value}
                        options={termOptions}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="my-6">
                <Controller
                  name="session"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={(val) => onChange(val.value)}
                      value={sessionOptions.find((c) => c.value === Number(value)) || value}
                      label="School Session"
                      defaultValue={value}
                      options={sessionOptions}
                    />
                  )}
                />
              </div>

              <div className="my-6">
                <Controller
                  name="class_id"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={(val) => {
                        onChange(val.value), setSelectedOptionForClass(val.value)
                      }}
                      value={classOptions?.find((c: any) => c.value === Number(value)) || value}
                      label="Class"
                      defaultValue={'Select'}
                      options={classOptions}
                    />
                  )}
                />
              </div>
              <div className="my-8">
                {selectedOptionForClass && (
                  <Controller
                    name="classarm_id"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={(val) => onChange(val.value)}
                        value={classArmoptions?.find((c) => c.value === Number(value)) || value}
                        label="Class Arm"
                        defaultValue={'Select'}
                        options={classArmoptions}
                        isLoading={isLoading}
                      />
                    )}
                  />
                )}
              </div>
            </div>
            <div className={styles.wrapper}>
              <a
                className="text-bold text-base my-4 gap-4 flex items-center justify-center text-primary"
                href="https://remotedev.izesan.com/exceluploads/studentBatch.xlsx"
                download="your file name"
              >
                Download a template <BiDownload className="text-primary text-2xl" />
              </a>

              <label htmlFor="fileInput" className={styles.selectWrap}>
                <div className={styles.selectBox}>
                  <AiOutlineFileAdd color="green" />
                  <p className="text-base">Upload file </p>
                  <p className="font-italic text-xs">
                    (<sup>*</sup>csv, .xls, .xlsx<sup>*</sup> )
                  </p>
                </div>
              </label>
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange } }) => (
                  <div>
                    <input
                      name="file"
                      type="file"
                      id="fileInput"
                      accept=".csv,.xls,.xlsx,"
                      style={{ display: 'none' }}
                      onChange={(val) => {
                        handleImageChange(val), onChange(val)
                      }}
                    />
                    {selectedFile ? <span className={styles.text}>{selectedFile}</span> : null}
                  </div>
                )}
              />

              {fileUploadError ? (
                <div className="text-error flex items-center gap-2 absolute -bottom-3 right-16">
                  <BiErrorCircle /> <p className=" text-error">Upload file!</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.saveBtn}>
            <Button type="submit" text="Save" />
          </div>
        </form>
      </div>
    </>
  )
}

export default BulkUpload
