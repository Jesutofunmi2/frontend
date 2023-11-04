import React from 'react'
import styles from './addFileForm.module.css'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm ,SubmitHandler } from 'react-hook-form'
import { TextInput } from '../../FormFields/TextInput/TextInput'

type Inputs = {
  date: Date
  topic: string
  mark: string
  attachment: File
}

interface AddFileProps {
  handleAddFile: (formdata: any, reset:()=>void) => void
}
const AddFileForm = ({ handleAddFile }: AddFileProps) => {
  // const [formdata, setFormdata] = useState({
  //   date: '',
  //   topic: '',
  //   no_attempt: 0,
  //   mark: 0,
  //   file: {},
  // })

  // HANDLE INPUT FIELDS
  // const handleChange = (e) => {
  //   const data = { ...formdata }
  //   data[e.target.name] = e.target.value
  //   setFormdata(data)
  // }

  // HANDLE FILE CHANGE
  // const handleFile = (e: any) => {
  //   setFormdata({ ...formdata, file: e.target.files[0] })
  // }

  // const handleAdd = (e) => {
 
  //   e.preventDefault()
  //   handleClick(formdata)
  //   // setFormdata({
  //   //   date: "",
  //   //   topic: 0,
  //   //   no_attempt: 0,
  //   //   mark: 0,
  //   //   file: {},
  //   // });
  // }
  const { register, handleSubmit, reset} = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleAddFile(data, reset)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1>Add File Assignment</h1>
        <hr />

        <div className="grid grid-cols-2 gap-8 mt-10">
          
            <TextInput
              register={{ ...register('date', { required: true }) }}
              label="Date"
              name="date"
              type="date"
              placeholder="Enter Date"
            />
         
            <TextInput
              register={{ ...register('topic', { required: true }) }}
              label="Topic"
              name="topic"
              type="text"
              placeholder="Enter topic"
            />
         
            <TextInput
              register={{ ...register('attachment', { required: true }) }}
              label="File Upload"
              name="attachment"
              type="file"
              placeholder="Add Attachment"
            />
         
          <>
            <TextInput
              register={{ ...register('mark', { required: true }) }}
              label="Mark"
              name="mark"
              type="number"
              placeholder="Mark"
            />
          </>
        </div>

        <div className={styles.btn}>
          <Button text="Add" type="submit"  />
        </div>
      </form>

      <ToastContainer />
    </>
  )
}

export default AddFileForm
