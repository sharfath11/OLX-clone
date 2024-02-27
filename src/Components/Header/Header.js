import React, { useContext } from "react";
import { authContext, firebaseContext } from "../Context/Context";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { getAuth ,signOut} from "firebase/auth";
function Header() {
  const navigate = useNavigate();

  const auth = getAuth();

  const { user } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome  ${user.displayName} `:<h4 onClick={()=>{navigate("/login")}}>Login</h4>}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              signOut(auth).then(() => {
               navigate("/login")
              }).catch((error) => {
                // An error happened.
              });
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{
              navigate("/create")
            }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
