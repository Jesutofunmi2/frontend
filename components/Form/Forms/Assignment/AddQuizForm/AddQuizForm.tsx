import React from 'react'

interface AddQuizFormProps {
    handleQuizAssignment: (formdata: any, reset: () => void) => void
  }
export default function AddQuizForm({ handleQuizAssignment}:AddQuizFormProps ) {
  return (
    <div>AddQuizForm</div>
  )
}
