import React from 'react'
import { User } from '@/utils/types'
import Image from 'next/image'


const Rightbar:React.FC =() => {
    
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthadyContainer">
                    <Image className="birthdayImg" src="/assets/itachi.jpg" alt="" height={50} width={50} />
                    <span className="birthdayText">
                        User friends will display here
                        </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendlist">
                </ul>
            </div>
        </div>
    )
}

export default Rightbar