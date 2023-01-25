import { NextPage } from "next";

interface Props {}

const SignIn:NextPage = (props):JSX.Element => {
  return (
    <>
    <h1>Login</h1>
    <form>
        <input type="email" placeholder="email" />
        <input type="password"  placeholder="*****"/>
        <input type="submit"  value="login"/>
    </form>
    </>
  )
}

export default SignIn