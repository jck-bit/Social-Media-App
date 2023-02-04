import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import { Container } from '@/styles/container.styled'
import {signIn, getSession} from "next-auth/react"
import { useEffect,useState } from 'react'
import Rightbar from '@/pages/widgets/Rightbar'
import NewFeed from './newfeed'
import Share from '@/components/Share'
import { Post } from '@/utils/types'
import Loader from './loader'

function Home() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Post[]>([])
 
 useEffect(() =>{
  const fetchData =async () => {
   const response = await fetch('http://localhost:3000/api/posts')
   const responseData = await response.json()
   setData(responseData)
  }
  
  fetchData()
},[])


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
      return <Loader/>
    }

    return (
    <>
      <Container>
        <Sidebar/>
      <div className='post_section'>
      <Share/>
      <div className="post">
       {data.map((post) =>{
          return(
            <div key={post.id}>
              <NewFeed username={post.username} content={post.content} userImage={post.userImage} date={post.date} />
            </div>
          )
       })}
       </div>
    </div>
    </Container>
  </> 
    )

}


export default Home
