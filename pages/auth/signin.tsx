import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useState,FormEventHandler } from "react";

interface Props {}

const SignIn:NextPage = (props):JSX.Element => {
  const [userInfo, setUserInfo] = useState({email: '',password:""})
  const handleSubmit:FormEventHandler<HTMLFormElement> = async(e) =>{
    e.preventDefault()

    const res = await  signIn('credentials', {
      email: userInfo.email,
      password:userInfo.password,
      redirect:false
    })
    console.log(res)
  }
  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="email" 
          value={userInfo.email}
          onChange={({target}) =>
          setUserInfo({...userInfo,email:target.value})
        }
          />
        <input 
         type="password" 
         placeholder="*****" 
         value={userInfo.password}
         onChange={({target}) =>
          setUserInfo({...userInfo,password:target.value})
        }
         />
        <input type="submit"  value="login"/>
    </form>
    </>
  )
}

export default SignIn