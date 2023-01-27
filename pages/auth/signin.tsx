import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/router'


interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };
  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Email</label>
        <input 
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="Email"
          className="form-control"
          name="email"
          required
        />
        </div>
        <div className="form-group">
        <label>Password</label>
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
          className="form-control"
          name="password"
          required
        />
        </div>
        <div className="signup-button">
        <a type="button" onClick={() => router.push('/auth/signup')}>Dont have an account?  signup</a>
        <input type="submit" value="signin" className="btn btn-primary"/>
        </div>
      </form>
    </div>
  );
};

export default SignIn;


