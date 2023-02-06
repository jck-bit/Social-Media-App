import React from 'react'
import axios from 'axios';

import { User } from '@/utils/types'

interface ShowProps{
    response: User[]
}

const Users = ({response}: ShowProps) => {
    return (
      <div>
        {response ? response.map((data) => {
          return <h1 key={data.password}>{data.username}</h1>;
        }) : <p>Loading...</p>}
      </div>
    );
  };
  

export async function getServerSideProps() {
    const response = await axios.get('https://social-media-app-kappa.vercel.app/api/users')
    return{
        props:{ response: response.data}
    }
}

export default Users