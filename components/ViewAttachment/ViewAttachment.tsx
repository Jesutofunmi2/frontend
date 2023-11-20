import React from 'react'

export default function ViewAttachment({ url }: string | any) {
  const getExtension = url.split('.').pop()

  return (
    <>
      {getExtension.toLowerCase() === 'pdf'||getExtension.toLowerCase() === 'mp4' ? (
        <div>
          <iframe src={url} width={'100%'} height={500} />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '100%',
            height: '70vh',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
    </>
  )
}
