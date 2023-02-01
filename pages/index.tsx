import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import { Container } from '@/styles/container.styled'
import {signIn, getSession, useSession, signOut} from "next-auth/react"
import { useEffect,useState } from 'react'
import Rightbar from '@/pages/widgets/Rightbar'
import NewFeed from './newfeed'
import Share from '@/components/Share'
import { Post } from '@/utils/types'

interface Props{
  data: Post[]
}

function Home({data}:Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const securePage =async () => {
      const session = await getSession()
      if(!session){
        signIn()
      }else{
        setLoading(false)
      }
    }
    securePage()
    }, [])
    if(loading){
      return <h2> You are Logged out....</h2>
    }
    return (
    
<>
      <Container>
        <Sidebar/>
      <div className='post_section'>
      <Share />
      <div className="post">
       {data.map((post) =>{
          return(
            <NewFeed username={post.username} content={post.content} userImage={post.userImage}/>
          )
       })}
       </div>
    </div>
    </Container>
  </> 
    )

}

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/api/posts')
  const data = await res.json()
  
  return {
    props: {data}}
}

export default Home