import React, { useState } from "react";
import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/sass/pages/_loginStyles.scss";
import SignInButton from "../../components/Buttons/signInButton";
import {  userLogin } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
// import { selectUser } from "../../utils/selectors";

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // redirect authenticated user to profile screen
 useEffect(() => {
  if (userInfo) {
    navigate('/profile')
  }
}, [navigate, userInfo])
  const handleFormSubmit = () => {
    dispatch(userLogin({ email, password }));
    navigate("/profile");
   
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="current-password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <SignInButton onClick={handleFormSubmit} />
          {loading && <p className="error-message">{loading}</p>}
        </form>
      </section>
    </main>
  );
}
