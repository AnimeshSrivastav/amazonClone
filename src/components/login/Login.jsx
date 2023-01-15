import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signin = (e) => {
    e.preventDefault();

    //FIREBASE SIGN IN
    auth.signInWithEmailAndPassword(email, password).then((auth) => {
      if (auth) {
        navigate("/");
      }
    });
  };
  const register = (e) => {
    e.preventDefault();
    //FIREBASE REGITER
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="img"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h2>Sign in</h2>
        <label for="email">Email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">password </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login__signInButton" onClick={signin}>
          Signin
        </button>
        <button
          type="button"
          className="login__registerButton"
          onClick={register}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
