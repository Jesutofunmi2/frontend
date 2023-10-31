export interface IPayloadTeacher {
  image_url: string | File
  school_id: number
  name: string
  email: string
  address: string
}

export interface ITeacher {
  id?: string
  address: string
  count_down?: number
  email: string
  image_url: string | File
  name: string
  teacher_id: string
  survey_status?: string
  school?: any
}
