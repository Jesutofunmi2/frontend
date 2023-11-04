import { ILanguage } from './languages.'

export interface LessonTopic {
  data: Lesson[]
  message: string
}

export interface Lesson {
  answered: []
  content: null
  description: string
  id: number
  last_question_answered: null
  media_type: null
  media_url: string
  objective: null
  percentage: number
  question_count: number
  question_type: string
  questions: string
  title: string
  type: string
}

export interface LessonQuestion {
  answered_type: string
  id: string
  image_url: string |any
  instruction: string
  language: ILanguage
  media_type: string
  media_url: string
  next_question_id: 0
  options:  QuestionOptions  []
  title: string
  topic: Lesson
}

export interface QuestionOptions {
  hint: string
  id: string
  image_url: string
  media_type: string
  media_url: string
  title: string
}
