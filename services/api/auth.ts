import { TeacherLoginRequest, SchoolLoginRequest, StudentLoginRequest  } from '@/types/auth'
import makeApiCall from '.'


export async function schoolLogin(payload: SchoolLoginRequest ) {
  const response = await makeApiCall('/api/v1/auth/schoolLogin', 'post', payload)
  return response
}

export async function teacherLogin(payload: TeacherLoginRequest) {
 const response = await makeApiCall('/api/v1/auth/teacherLogin', 'post', payload)
  return response
} 

export async function studentLogin(payload: StudentLoginRequest) {
  const response = await makeApiCall('/api/v1/auth/studentLogin', 'post', payload)
   return response
 } 