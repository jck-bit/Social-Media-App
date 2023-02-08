import { useRouter } from 'next/router'
import axios from 'axios'
import { User } from '@/utils/types'
import Person from '@/components/Person'

interface UserProps {
  user: User | null,
}

const User = ({ user }: UserProps) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      {user ? (
        <>
          <Person image={user.image} username={user.username}/>
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
