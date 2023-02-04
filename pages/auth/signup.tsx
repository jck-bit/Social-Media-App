import React, {useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface SignUpData {
    username:string;
    email:string;
    password:string;
}

const Signup:React.FC = () => {
    const router = useRouter()

    const [formData, setFormData] = useState<SignUpData>({
        username: '',
        email: '',
        password:''
    })

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            await axios.post('https://social-media-app-kappa.vercel.app/api/users', formData)
            router.push('/auth/signin');
            toast.success("signup successfull",{
                hideProgressBar: false,
                closeOnClick:true,
            })
        } catch (error:any) {
            console.error(error)
            toast.error(`${error.response.data.message}`,{
                hideProgressBar:false,
                draggable:true,
            })
        }
    }

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }
  return (
    <div className="sign-in-form">
    <form onSubmit={handleSubmit}>
       <div className="form-group">
        <label>Username</label>
        <input 
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="form-control"
            name="username"
            required
        />
       </div>
      <div className="form-group">
        <label>Email</label>
        <input 
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="password"
            className="form-control"
            name="password"
            required
        />
      </div>
      <div className="signup-button">
      <input type="submit" value="submit" className="btn btn-primary"/>
      </div>
    </form>
  </div>
  )
}

export default Signup