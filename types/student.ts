// export interface StudentRequest {
//   age: string
//   classarm_id: string
//   country: string
//   first_name: string
//   gendar: string
//   language: string
//   last_name: string
//   school_id: string
//   session: string
//   term: string
// }
// export interface IStudent {
//   age: number
//   class: string
//   classarm: string
//   count_down: string
//   country: string
//   gendar: string
//   id: number
//   language: string
//   last_name: string
//   school: { id: number; name: string; email: string; email_verified_at: null; type: string }
//   student_id: string
//   survey_status: true
//   username: string
// }

export interface IFormStudent {
    school_id: string;
    first_name: string;
    last_name: string;
    language: string;
    age: number;
    gendar: string;
    country: string;
    class_id:number;
    classarm_id: number;
    term: string;
    session: string;
  }
  
export interface IStudent {
  age: number
  class?: string
  classarm?: string
  count_down?: string
  country: string
  gendar: string
  id?: number
  language: string
  last_name: string
  school?: { id: number; name: string; email: string; email_verified_at: null; type: string }
  student_id?: string
  survey_status?: true
  first_name?: string
}