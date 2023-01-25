import React from 'react'
import { Feedback,Settings } from '@material-ui/icons'
import { Right,Logo,Image,Sylvia,Fourth,Third,Fifth,Second,Major } from '@/styles/container.styled'


const Sidebar = () => {
  return (
    <Right>
      <Logo>
         <Image src='/free.jpg' alt=''/>
         <span className='spanner'>Myngram</span>
      </Logo> 

     <Second>
        <Sylvia src='./images/logout.png' alt=''/>
        <p> Nikita </p>
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