import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link} from 'react-router-dom'
import { useStateValue } from "../StateProvider/Stateprovider";
import { auth } from "../login/firebase";

function Header() {
  const [{basket, user},dispatch]=useStateValue();
  const handleAuth =()=>{
    if (user) {
      dispatch({
        type: "EMPTY_BASKET",
      })
      auth.signOut();
    }
   
  }
  return (
    <div className="header">
      <Link to='/' >
      <img
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="img"
        className="header_icon"
      />
      </Link>
      <div className="header_searchbar">
        <input type="text" />
        <SearchIcon className="header_searchicon" />
      </div>
      <div className="header_icons">
        <Link className="link" to={!user && "/login"}>
        <div onClick={handleAuth} className="header_options">
          <div className="header_lineoOne">Hello,{user? user.email :"Guest"}</div>
          <div className="header_lineTwo">{user? "Sign Out" : "Sign in"}</div>
        </div>
        </Link>
        <Link  className="link" to='/orders' >
        <div className="header_options">
          <div className="header_lineoOne">Retuen</div>
          <div className="header_lineTwo">& Orders</div>
        </div>
        </Link>
        <div className="header_options">
          <div className="header_lineoOne">Your</div>
          <div className="header_lineTwo">Prime</div>
        </div>
         <Link className="link" to='/checkout'>
        <div className="headerBasketOption">
          <ShoppingCartIcon className="carticon"/>
          <span className="header_lineTwo header_backetcount">{basket.length}</span>
        </div>
         </Link> 
      </div>
    </div>
  );
}

export default Header;
