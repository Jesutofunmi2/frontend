
export interface Program {
  src: StaticImageData
  title: string
  text: string
}

export interface Profile {
  id: number
  count_down: number
  country: string
  email: string
  how_do_you_see_us: string
  image_url: string
  name: string
  no_of_pupil: string
  phone_number: string
  school_name: string
  type: string
}

export interface School extends Profile {}
// export interface SchoolProfile extends TeacherShool {}
export interface ITeacher {
  id: number
  address: string
  count_down: number
  email: string
  image_url: string
  name: string
  teacher_id: string
  survey_status: string
  school: TeacherShool
}

export interface TeacherShool extends Profile {
  email_verified_at: string
  address: string
  lga: string
  teacher_id: string
  survey_status: string
  state: string
  status: number
  trial_days: number
  updated_at: string
  created_at: string
  verification_token: string
}

export interface StudentRequest {
  age: string
  classarm_id: string
  country: string
  first_name: string
  gendar: string
  language: string
  last_name: string
  school_id: string
  session: string
  term: string
}
export interface IStudent {
  age: number
  class: string
  classarm: string
  count_down: string
  country: string
  gendar: string
  id: number
  language: string
  last_name: string
  school: { id: number; name: string; email: string; email_verified_at: null; type: string }
  student_id: string
  survey_status: true
  username: string
}

export interface ClassArm {
  class: null
  id: number
  name: string
}
export interface ClassProfile {
  class_arms: ClassArm[]
  classs_room_name: string
  id: number
  language: string
  language_id: number
}

export interface InitialState {
  currentUser: {
    data: Profile
  } | null
  currentSchool: { data: School } | null
  currentTeacher: { data: ITeacher } | null
}
