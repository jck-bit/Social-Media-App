import { Post } from "@/utils/types";
import { MoreVert } from '@material-ui/icons'
import Share from "@/components/Share";

interface Props{
    data: Post[]
}

const Post= ({data}:Props) => {
    
    return (
      <div className='post_section'>
      <Share />
      <div className="post">
      <>
       {data.map((post) =>{
          return(
          <div className="postWrapper">
          <div className="postTop">
            <div className="postLeft">
                <img  className="postProfileImg"src={post.userImage} alt="" />
                <span className="postUsername">{post.username}</span>
            </div>
            <div className="postRight">
                <MoreVert className="myn"/>
            </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post.content}</div>
             </div>
               <div className="postBottom">
               <div className="postBottomLeft">
          </div>          
        </div>
      </div>
          )
       })}
       </>
       </div>
</div>
      
    )
  }

  export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/api/posts')
    const data = await res.json()
    
    return {
      props: {data}}
  }
  

export default Post