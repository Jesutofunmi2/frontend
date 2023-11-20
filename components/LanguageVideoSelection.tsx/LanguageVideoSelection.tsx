import { useGetLanguageVideos, useGetLanguages } from '@/services/api/languages'
import React, { useEffect, useState } from 'react'
import Select from '../Form/FormFields/Select/DropDown'
import { Spinner } from '../Loader/Loader'

export default function LanguageVideoSelection() {
  const { data: languages } = useGetLanguages()
  const [selectedLanguage, setSelectedLanguage] = useState<number>(0)
  useEffect(() => {
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage)
    } else {
      setSelectedLanguage(0)
    }
  }, [selectedLanguage])

  const { data: languageVideos, isLoading } = useGetLanguageVideos(1)

  const languageOptions = languages?.map((item) => {
    return { value: item?.id, label: item?.name, disabled: item.status === 1 ? false : true }
  })

  const handleLanguageChange = (selectedLanguage: any) => {
    setSelectedLanguage(selectedLanguage.value)
  }

  return (
    <div className="mb-6">
      <Select
        onChange={handleLanguageChange}
        label="Language"
        defaultValue={'Select'}
        options={languageOptions}
      />
      {/* {isLoading ? <Spinner /> : languageVideos?.length ? <p>{}</p> : null} */}
    </div>
  )
}
