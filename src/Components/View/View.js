import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseContext } from '../Context/Context';
import Firebase from '../Firebase/Config';
import { postContext } from '../Context/PostContext';
import { query, where,  } from "firebase/firestore";

function View() {
  const [userDetials,setUserDetials]=useState()
  const {postDetials} = useContext(postContext);
  const {firebase}=useContext(firebaseContext)
  const db = getFirestore(Firebase);
useEffect(() => {
  getProducts()
 
}, [])
const getProducts = async () => {

  console.log(postDetials);
  const  {userID}=postDetials;

const q = query(collection(db, "users"), where("id", "==",userID));

const querySnapshot = await getDocs(q);


querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUserDetials(doc.data())
});

};
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetials.url}
          alt=""
          
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetials.price} </p>
          <span>{postDetials.name}</span>
          <p>{postDetials.category}</p>
          <span>{postDetials.createdAt}</span>
        </div>
       { userDetials && <div className="contactDetails">
          <p>Seller Detials</p>
          <p>Name  {userDetials.username}</p>
          <p>Contact {userDetials.phone}</p>
        </div>
}
      </div>
    </div>
  );
}
export default View;
// import { collection, query, where, getDocs } from "firebase/firestore";

// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });