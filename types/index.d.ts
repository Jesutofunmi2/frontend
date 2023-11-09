

export interface Program {
  src: StaticImageData
  title: string
  text: string
}

export interface Profile {
  student_id:number
  id:string
  count_down: string
  country: string
  email: string
  how_do_you_see_us: string
  image_url: string
  name: string
  no_of_pupil: string
  phone_number: string
  school_name: string
  type: string
  school:any
  survey_status:boolean
  
}

export interface ISchool extends Profile {}
// export interface SchoolProfile extends TeacherShool {}


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


export interface InitialState {
  currentUser: {
    data: Profile
  } | null
  currentSchool: { data: ISchool } | null
  currentTeacher: { data: ITeacher } | null
}
