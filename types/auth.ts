export interface SchoolLoginRequest {
  email: string
  password: string
}
export interface StudentLoginRequest {
  login_id: string
  password: string
}

export interface TeacherLoginRequest {
  teacher_id: string
  password: string
}

export interface IRegisterForm {
  name: string
  email: string
  password: string
  confirm_password: string
  type: string
  country: string
  school_name: string
  phone_number: string
  no_of_pupil: string
  image_url: string
  how_do_you_see_us: string
  device_name: string
}
