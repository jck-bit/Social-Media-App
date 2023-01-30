import React from 'react'


const Person = ({username, userImage}:any) => {
  return (
    <div className='person_content'>
      <img src={userImage} alt="" className='user_image'/>
      <p>{username}</p>
    </div>
  )
}

export default Person