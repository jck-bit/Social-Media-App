import { GrGallery} from 'react-icons/gr'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'


const Share = () => {
    const [content, setContent] = useState('')
    const {data: session} = useSession()

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/api/posts' ,{
                content,
                userId: session?.user?.id
            })
        } catch (error) {
            
        }

        setContent("")
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                <Image className="shareProfileImg" src={session?.user?.image as string} alt=""  width={50} height={50}/>
                    <form action="" className='form_input' onSubmit={handleSubmit}>
                        <textarea
                         placeholder= {`what is on your Mind ${session?.user?.name} ?`} 
                         className="searchInput"
                         value={content}
                         onChange={ e =>setContent(e.target.value)}
                         />
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <GrGallery  className="shareIcon"/>
                            <span className="shareOptionText">Photo or video</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Post</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Share
