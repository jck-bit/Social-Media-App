import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { User, Post } from '@/utils/types'
import { getSession } from 'next-auth/react'
import Loader from './loader'
import NewFeed from './newfeed'
import Sidebar from '@/components/Sidebar'
import { Container } from '@/styles/container.styled'
import Share from '@/components/Share'
import Rightbar from '@/components/Rightbar'

interface ShowProps {
  user: User | null,
  posts: Post[]
}

const Home = ({ user, posts }: ShowProps) => {
  const router = useRouter()
  const [redirect, setRedirecting] = useState(false)

  useEffect(() => {
    if (!user) {
      setRedirecting(true)
      router.push('auth/signin')
    }
  }, [user, router])

  return (
    <div>
      {user ? (
        <Container>
          <Sidebar />
          <div className='post_section'>
            <Share />
            <div className="post">
              {posts.map((post) => {
                return (
                  <div key={post.id}>
                    <NewFeed username={post.username} content={post.content} userImage={post.userImage} date={post.date} id={post.userId}/>
                  </div>
                )
              })}
            </div>
          </div>
          <Rightbar />
        </Container>
      ) : (
        <>{redirect ? <Loader /> : null}</>
      )}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  let user = null
  let posts = []

  if (session) {
    const userResponse = await axios.get(
      `https://social-media-app-kappa.vercel.app/api/users/${session?.user?.id}`
    )
    user = userResponse.data

    const postsResponse = await axios.get(
      'https://social-media-app-kappa.vercel.app/api/posts'
    )
    posts = postsResponse.data
  }

  return {
    props: {
      user,
      posts
    }
  }
}

export default Home
