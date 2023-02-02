import { MoreVert } from '@material-ui/icons'

interface DATA{
    username:string;
    content:string;
    userImage:string;
    date:string;
}

const NewFeed = ({username, content, userImage, date}:DATA) => {
    
    return (
      <>
          <div className="postWrapper">
          <div className="postTop">
            <div className="postLeft">
                <img  className="postProfileImg"src={userImage} alt="" />
                <span className="postUsername">{username}</span>
            </div>
            <div className="postRight">
                <MoreVert className="myn"/>
            </div>
        </div>
        <div className="postCenter">
          <div className="postText">{content}</div>
             </div>
               <div className="postBottom">
                <div className="postBottomLeft">{date}</div>     
              </div>
      </div>
       </>
      
    )
  }

  export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/api/posts')
    const data = await res.json()
    
    return {
      props: {data}}
  }
  

export default NewFeed