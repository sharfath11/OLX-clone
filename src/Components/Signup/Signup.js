import React, { useContext, useState } from "react";
import {} from "firebase/firestore/lite";
import "firebase/firestore";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import {
  Firestore,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { firebaseContext } from "../Context/Context.js";
import { useNavigate } from "react-router-dom";
import Firebase from "../Firebase/Config";


export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const { firebase } = useContext(firebaseContext);
  const db = getFirestore(Firebase);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(user, {
      displayName: username,
    })
      .then(async () => {
        await addDoc(collection(db, "users"), {
          id:user.uid,
          username: username,
          phone: phone,
          email,
        });
      })
      .then(() => {
        navigate("/login");
      }).catch((error)=>{
        alert(error.message)
      })
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            defaultValue="John"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            defaultValue="Doe"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <br />
          <br />
          <button>Singup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
