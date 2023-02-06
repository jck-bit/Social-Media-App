import axios from 'axios'
import { getSession } from 'next-auth/react'
import { User } from '@/utils/types'

interface Props {
  user: User
}

const UserProfile = ({ user }: Props) => {
  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  )
}

export async function getServerSideProps(ctx:any) {
  const session = await getSession(ctx)

  if (!session) {
    return { props: { user: null } }
  }

  const user = await axios.get(`http://localhost:3000/api/users/${session?.user?.id}`)
    .then(res => res.data)

  return {
    props: { user },
  }
}

export default UserProfile
