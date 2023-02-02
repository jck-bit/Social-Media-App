import { 
  Chat,
  Fireplace,
  RssFeed
  } from '@material-ui/icons'

  import { useSession } from 'next-auth/react'
  import { signOut } from 'next-auth/react'
import Image from 'next/image'

const Sidebar = () => {
  const {data: session, status} = useSession()
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
                      <RssFeed className="sidebarIcon"/>
                      <span className="sidebarListItemText">Feeds</span>
                  </li>
                  <li className="sidebarListitems">
                      <Chat className="sidebarIcon"/>
                      <span className="sidebarListItemText">Chats</span>
                  </li>
                  <li className="sidebarListitems">
                      <Fireplace className="sidebarIcon"/>
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
