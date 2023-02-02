import React from 'react'
import { User } from '@/utils/types'
import Image from 'next/image'

interface Props{
    data: User[]
}

const Rightbar:React.FC<Props> = ({data}:Props) => {
    console.log(JSON.stringify(data))
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthadyContainer">
                    <Image className="birthdayImg" src="/assets/itachi.jpg" alt="" height={50} width={50} />
                    <span className="birthdayText">
                        <b>Juren</b> and <b>three other friends</b> have a birthday today
                        </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                  <div>
                    {data && data.map((o, i)=>(
                        <h2 key={o.username}>{o.username}</h2>
                    ))}
                  </div>
                <ul className="rightbarFriendlist">
                </ul>
            </div>
        </div>
    )
}

export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()
    
    
    return {
      props: {data}}
  }
  

export default Rightbar