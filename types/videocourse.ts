export interface VideoCourse {
  description: string
  id: string
  image_url: string
  status: number
  title: string
}

export interface IVideoLeson {
  category: string
  id: string
  level: string
  title: string
  topics: []
}

export interface IVideoLessons {
  answered: []
  content: string
  description: string
  id: number
  last_question_answered: null
  media_type: null
  media_url: string
  objective: string
  percentage:number
  question_count: number
  question_type: string
  questions: []
}
