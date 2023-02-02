import Image from 'next/image'
import React from 'react'


const Person = ({username, userImage}:any) => {
  return (
    <div className='person_content'>
      <Image src={userImage} alt="" className='user_image' layout='fill'/>
      <p>{username}</p>
    </div>
  )
}

export default Person