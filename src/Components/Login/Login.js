import React, { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { firebaseContext } from '../Context/Context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const auth = getAuth();
  const {firebase}=useContext(firebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
  .then(() => {
    navigate('/')
  }).catch((error)=>{
    alert(error.message)
  })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <a onClick={()=>navigate('/singup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
