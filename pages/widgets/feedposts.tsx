import React, { useEffect, useState } from 'react';
import { Post } from '@/utils/types';
import { MoreVert,ThumbDown, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import Share from '@/components/Share';

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }:Props) => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/posts');
      const jsonData = await response.json();

      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className='post_section'>
    <Share />
    <div className="post">
      {data.map((post) =>{
        return(
          <div className="postWrapper">
          <div className="postTop">
          <div className="postLeft">
              <img  className="postProfileImg"src={post.userImage} alt="" />
              <span className="postUsername">{post.username}</span>
              {/* <span className="postDate">{post.content}</span> */}
          </div>
          <div className="postRight">
              <MoreVert className="myn"/>
          </div>
      </div>
      <div className="postCenter">
        <div className="postText">{post.content}</div>
          {/* <img className="postImg"src={post.photo} alt="first post" /> */}
           </div>
             <div className="postBottom">
             <div className="postBottomLeft">
            
             {/* <img className="likeIcon" src="/assets/like.png" alt="" onClick ={likeHandler}/>                   
              <span className="postlikeCounter">{like}</span>
             
              <ThumbDown htmlColor="tomato"  className="likeIcon" onClick={dislikeHandler}/>
              <span >{disliked}</span> */}
        </div>
          {/* <div className="postBottomRight">
              <span className="postCommentText">{post.comment}</span>
          </div> */}
          
      </div>
      
      
  </div>
        )
      })}
</div>
</div>
  );
};

export default Posts;