import React from 'react'

export default function ViewAttachment({ url }: string | any) {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        backgroundPosition: 'center',
      }}
    ></div>
  )
}
