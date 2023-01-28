import React from 'react'
import { Post } from '@/utils/types'

interface Props {
    data: Post[]
}

const Posts = () => {
  return (
    <main className='main_container'>
       <div className="the_post">
        <textarea placeholder='say something...'></textarea>
       </div>
       <div className="post_button">
      <input type="submit" value="Post" className='create_post_submit' />
       </div>
    </main>
    )
}

export default Posts