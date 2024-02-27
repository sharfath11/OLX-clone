import React,{useContext, useEffect} from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import {authContext, firebaseContext} from './Components/Context/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Create from "./Pages/Create" 
import Post from './Components/Context/PostContext';
import View from './Components/View/View';

function App() {
  const {setUser}=useContext(authContext);
  const {firebase}=useContext(firebaseContext)
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
     setUser(user)
    });
  })
  return (
    <div>
      <Post>
     <Routes>
      <Route  path="/"  element={<Home />}/>
      <Route  path="/singup" element={<Signup />}/>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/create" element={<Create/>}/>
      <Route  path="/view" element={<View/>}/>
   
      
     </Routes>
     </Post>
    </div>
  );
}

export default App;
