export interface IFileAssignment {
  deadline: string
  id: number
  media_url: string
  name: string
}

export interface IFileAssignmentPayload {
  school_id: number
  teacher_id: string
  class_id: number
  date: string
  mark: number
  notification: string
  media_url: string | File
  topic: string
}

export interface IModuleAssignment {
  class_id: number
  deadline: string
  id: number
  mark: number
  module: string
  no_attempt: number
  notification: number
  school_id: number
  teacher_id: string
  time: number
  topic: [{ title: string }]
  type: string
}

export interface IModuleAssignmentPayload {
  class_id: number
  school_id: number
  teacher_id: string
  type: string
  data: [
    {
      module: number
      deadline: string
      time: number
      no_attempt: number
      notification: boolean
      mark: number
    },
  ]
}

export interface IQuizAssignment {
  class_id: number
  deadline: string
  id: number
  mark: number
  no_attempt: number
  notification: number
  school_id: number
  teacher_id: string
  time: number
  topic: [{ title: string }]
  type: string
  language: [{name:string}]
  questions: []
}

export interface IQuizAssignmentPayload {
  school_id: number
  teacher_id: string
  class_id: number
  notification: string
  questions_id: []
  module_id: number
  deadline: string
  no_attempt: number
  language_id: number
  time: number
  mark: number
}
export interface IVideoAssignmentPayload {
  school_id: number
  teacher_id: string
  class_id: number
  mark: number
  notification: string
  module_id: number
  deadline: string
  time: number
  no_attempt: number
  language_id: number
  videos_id: []
}

export interface IVideoAssignment {
  class_id: number
  deadline: string
  id: number
  mark: number
  no_attempt: number
  notification: number
  school_id: number
  teacher_id: string
  time: number
  course:[{ title: string }]

module_id: [{ title: string }]
  type: string
  language: [{name:string}]
 videos_id: []
}