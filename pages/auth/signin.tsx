import { signIn } from "next-auth/react";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import Load from "@/components/Load";
import { toast } from 'react-toastify';

const SignIn = () => {
  const router = useRouter()
  const {data: session}= useSession()

  useEffect(() =>{
    if (session){
      router.push("/")
    }
  })

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);


    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    setLoading(false)

    if (!res?.ok) {
      toast.error("Incorrect Credentials");
    }else{
      toast.success("signing in...",{
        autoClose:1500
      })
    }
  };
  return (
    <div className="sign-in-form">
      {loading ? (
        <Load/>
      ) : (
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
            <a type="button"  className="sign_up_tag" onClick={() => router.push('/auth/signup')}>Dont have an account?  signup</a>
            <input type="submit" value="signin" className="btn btn-primary"/>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;
