import React from 'react'

const Person = ({username, image}:any) => {
  return (
    <div className='person_content'>
      <h1>{username}</h1>
    </div>
  )
}

export default Person