import React, { useState } from "react";

import "font-awesome/css/font-awesome.min.css";
import "../../styles/sass/pages/_loginStyles.scss";
import { userLogin } from "../../services/userService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import SignInButton from "../../components/Buttons/signInButton";
import { updateEmailToRemember } from "../../features/userSlice";

export default function Login() {
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      if (name === "username") {
        setEmail(value);
      } else if (name === "current-password") {
        setPassword(value);
      }
    }
  };




  const validateEmail = (email) => {
    // Utilisation de regex pour valider l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      try {
        dispatch(userLogin({ email, password })).then((action) => {
          const response = action.payload;

          // La connexion a réussi par rapport à la réponse du backend ?
          if (response && response.userToken) {
            const userToken = response.userToken;

            // Mettre à jour le token dans le Redux store
            dispatch(setUserToken(userToken));

            if (rememberMe) {
              dispatch(updateEmailToRemember(email));
            }

            // redirection vers la page de profile
            navigate("/profile");
          } else {
            // Réinitialiser le mot de passe en cas d'échec de connexion
            setPassword("");
            setError("Login failed. Please check your login details.");
          }
        });
      } catch (error) {
        // Réinitialiser le mot de passe en cas d'erreur
        setPassword("");
        setError("Connection error :", error);
      }
    } else {
      setError(
        "Email address is not valid. Please enter a valid email address."
      );
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
              type="email"
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
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <SignInButton />
          {loading && <p className="error-message">{loading}</p>}
        </form>
      </section>
    </main>
  );
}
