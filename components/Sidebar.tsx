import React from 'react'
import { Feedback,Settings,  } from '@material-ui/icons'
import { Right,Logo,Image,Sylvia,Fourth,Third,Fifth,Second,Major } from '@/styles/container.styled'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
  const {data: session, status} = useSession()
  return (
    <Right>
      <Logo>
         <Image src='/free.jpg' alt=''/>
         <span className='spanner'>Social Media</span>
      </Logo> 

     <Second>
        <Sylvia src={`${session?.user?.image}`} alt=''/>
        <p>{session?.user?.name}</p>
     </Second>

     <Third>
       <p className='p-tag'>54k Followers</p>

       <p>217 Following</p>
      </Third>
     
      <Fourth>
        <hr/>
      </Fourth>

     <Major>
        <Fifth>
            <Feedback/>
            <span className='tag'>Feed</span>
        </Fifth> 
        <Fifth>
            <Settings/>
            <span className='tag'>Settings</span>
        </Fifth> 
        <Fifth>
        </Fifth>
     </Major>
  </Right>
  )
}

export default Sidebar