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