import Image from 'next/image'
import React from 'react'


const Person = ({username, image}:any) => {
  return (
    <div className='person_content'>
      <Image src={image} alt="" className='user_image' width={60} height={60}/>
      <p>{username}</p>
    </div>
  )
}

export default Person