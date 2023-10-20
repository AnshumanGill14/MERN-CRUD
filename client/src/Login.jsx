import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./Login.css"


const Login = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate()
    
  
    const handleLogin = async (e) => {
        e.preventDefault();
        let payload = { email, password };
        try {
            let { data } = await axios.post("http://localhost:3001/login", payload);
    
            if (data.token) {
                // Store the token in local storage or a more secure storage method.
                localStorage.setItem('token', data.token);
    
                navigate("/users");
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
  
    const handleSignUp = async (e) => {
        e.preventDefault();
        let payload = { email, password };
    
        try {
            // Make a request to your signup endpoint
            const { data } = await axios.post("http://localhost:3001/signUp", payload);
    
            if (data.token) {
                // Store the token in local storage or a more secure storage method.
                localStorage.setItem('token', data.token);
    
                // Redirect to the "/users" route after successful signup
                navigate("/users");
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
      <>
      
        <div className='loginPage'>
        <div className='card'>
        <div className="mb-3 row">
          <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label" >Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control " id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <div className='buttons'>
        <button className='loginButton btn btn-success' onClick={(e)=>handleLogin(e)}>Login</button>
        <button className='signUpButton btn btn-success' onClick={(e)=>handleSignUp(e)}>SignUp</button>
        </div>
        </div>
        </div>
      </>
    )
}

export default Login
