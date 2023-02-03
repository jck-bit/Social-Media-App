import {FiMoreVertical} from 'react-icons/fi'

import Image from 'next/image';

interface DATA{
    username:string;
    content:string;
    userImage:string;
    date:string;
}

const NewFeed = ({username, content, userImage, date}:DATA) => {
    
    return (
  
          <div className="postWrapper">
          <div className="postTop">
            <div className="postLeft">
            <Image  className="postProfileImg"src={userImage} alt="" width={50} height={50}/>
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