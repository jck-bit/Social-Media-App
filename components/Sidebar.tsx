import {MdFeed}  from 'react-icons/md'
import {BsFillChatFill}  from 'react-icons/bs'
import {FaUserFriends}  from 'react-icons/fa'

  import { useSession } from 'next-auth/react'
  import { signOut } from 'next-auth/react'
import Image from 'next/image'

const Sidebar = () => {
  const {data: session} = useSession()
  return (
      <div className ="sidebar">
          <div className="sidebarWrapper">
              <ul className="sidebarList">
                  <div className="Logo">
                  <Image src="/free.jpg" alt="" className='Image-logo' width={32} height={32}/>
                    <span className='spanner'>Social Media</span>
                  </div>
                  <div className="second">
                  <Image src={session?.user?.image as string} alt="" className='sylvia'  width={50} height={50}/>
                    <p>{session?.user?.name}</p>
                  </div>
                  <li className="sidebarListitems">
                      <MdFeed className="sidebarIcon"/>
                      <span className="sidebarListItemText">Feeds</span>
                  </li>
                  <li className="sidebarListitems">
                      <BsFillChatFill className="sidebarIcon"/>
                      <span className="sidebarListItemText">Chats</span>
                  </li>
                  <li className="sidebarListitems">
                      <FaUserFriends className="sidebarIcon"/>
                      <span className="sidebarListItemText">Friends</span>
                  </li> 
              </ul>
              <button className="sidebarButton" onClick={() => signOut()}>Log out</button>
              
              <hr className="sidebarHr"/>
              <ul className="sidebarFriendList">

              </ul>
          </div>
      </div>
  )
}

export default Sidebar
