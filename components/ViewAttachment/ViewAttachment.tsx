import React from 'react'

export default function ViewAttachment({ url }: string | any) {
  console.log(url)
  const getExtension = url.split('.').pop()

  return (
    <>
      {getExtension.toLowerCase() === 'pdf' ? (
        <div>
          <iframe src={url} width={'100%'} height={500} />
        </div>
      ) : (
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
      )}
    </>
  )
}
