import React, { useContext, useEffect, useState } from "react";
import { firebaseContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import Firebase from "../Firebase/Config";
import { postContext } from "../Context/PostContext";

function Posts() {
  const {setpostDetials}=useContext(postContext)
  // const {productDetials}=useContext() 
  const [post, setPost] = useState([]);
  const { firbase } = useContext(firebaseContext);
  const db = getFirestore(Firebase);
  const navigate=useNavigate()

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      console.log(allPost);
      setPost(allPost);
      
    });

    // let hello= doc.data()
    // arr=[hello]
    // setPost(arr)
    // console.log(hello[0])
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {post.map((product) => (
            <div className="card" onClick={()=>{
              setpostDetials(product)
              navigate('/view')
            }}>
              <div className="favorite"></div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite"></div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
