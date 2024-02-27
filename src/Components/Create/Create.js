import React, { Fragment, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { firebaseContext, authContext } from "../Context/Context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Firebase, { imgdb } from "../Firebase/Config";
import { v4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Create = () => {
  const navigate=useNavigate()
  const date=new Date()
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPraice] = useState("");
  const [img, setImg] = useState();
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(authContext);
  const db = getFirestore(Firebase);
  const handleSubmit = () => {
    const productImagesRef = ref(imgdb, `images/${v4()}.jpg`);
    uploadBytes(productImagesRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db, "products"), {
          userID: user.uid,
          name,
          category,
          price,
          url,
          createdAt:date.toDateString()
        });
      });
    }).then(()=>{
      navigate('/')
    });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPraice(e.target.value)}
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={img ? URL.createObjectURL(img) : ""}
          ></img>

          <br />
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
