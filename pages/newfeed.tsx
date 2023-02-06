import {FiMoreVertical} from 'react-icons/fi'
import { Post } from '@/utils/types';
import Image from 'next/image';
import { useRouter } from 'next/router';


const NewFeed: React.FC<Post> = ({username, content, userImage, date, id}) => {
    
  const router = useRouter()
  const handleClick =() =>{
    router.push(`/users/${id}`)
  }
    return (
  
          <div className="postWrapper">
          <div className="postTop">
            <div className="postLeft" onClick={handleClick}>
            <Image  className="postProfileImg"src={userImage as string} alt="" width={50} height={50}/>
                <span className="postUsername">{username}</span>
            </div>
            <div className="postRight">
                <FiMoreVertical className="myn"/>
            </div>
        </div>
        <div className="postCenter">
          <div className="postText">{content}</div>
             </div>
               <div className="postBottom">
                <div className="postBottomLeft">{date}</div>     
              </div>
      </div>
       
      
    )
  }

export default NewFeed