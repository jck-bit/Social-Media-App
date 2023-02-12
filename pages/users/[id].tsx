import { useRouter } from 'next/router'
import axios from 'axios'
import { User } from '@/utils/types'
import Person from '@/components/Person'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface UserProps {
  user: User | null,
}

const User = ({ user }: UserProps) => {
  const {data: session} = useSession()
  console.log(session?.user?.id)
  const [following, setFollowing] = useState(false) 
  
  const handleFollow =async () => {
    try {
      await axios.patch(`http://localhost:3000/api/users/${session?.user?.id}`)
      setFollowing(true)
    } catch (error) {
      console.error(error)
    }
  }

  const router = useRouter()
  const { id } = router.query

  return (
    <div>
    {user ? (
      <>
        <Person image={user.image} username={user.username} />
        {following ? (
          <p>You are following {user.username}</p>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </>
    ) : (
      <h1>User not found</h1>
    )}
  </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query
  let user = null

  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${id}`
    )
    user = response.data
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      user,
    }
  }
}

export default User