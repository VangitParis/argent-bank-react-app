import React, { useState } from "react";
// import { useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/sass/pages/_loginStyles.scss";
import SignInButton from "../../components/Buttons/signInButton";
import { userLogin } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import { userToken } from "../../features/authSlice";

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setEmail(e.target.value);
    } else if (e.target.name === "current-password") {
      setPassword(e.target.value);
    }
  };
  // // redirect authenticated user to profile screen
  // useEffect(() => {
  //   if (userToken) {
  //     console.log(userInfo);
  //   }
  // }, [userToken]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Champs email et mot de passe sont remplis ?
    if (email && password) {
      // Données de connexion au backend
      dispatch(userLogin({ email, password, authToken: userToken }));
     console.log(userInfo);
      navigate("/profile");
    } else {
      // Cas où les champs ne sont pas remplis
      // Message d'erreur
      console.log("Veuillez remplir tous les champs");
    }
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
              onChange={handleChange}
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
              onChange={handleChange}
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
