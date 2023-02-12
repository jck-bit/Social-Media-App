import React, { useEffect, useState } from 'react';
import { User  } from '@/utils/types';
import { getSession } from 'next-auth/react';
import Image from 'next/image';


const Rightbar: React.FC = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            if (session) {
                const user:any =  session?.user?.id
                setUser(user);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthadyContainer">
                    <Image className="birthdayImg" src="/assets/itachi.jpg" alt="" height={50} width={50} />
                    <span className="birthdayText">
                        {user ? (
                            <div>
                                <h1>{`You have ${user?.friends} friends`}</h1>
                            </div>
                        ) : (
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        )}
                    </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendlist">
                </ul>
            </div>
        </div>
    );
};

export default Rightbar;
