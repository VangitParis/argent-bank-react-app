import React, { useState } from "react";

import "font-awesome/css/font-awesome.min.css";
import "../../styles/sass/pages/_loginStyles.scss";
import { userLogin } from "../../services/userService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";

export default function Login() {
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setEmail(value);
    } else if (name === "current-password") {
      setPassword(value);
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

        dispatch(userLogin({ email, password }))
          .then((action) => {
            const response = action.payload;

            // Vérifiez si la connexion a réussi en fonction de la réponse du backend
            if (response && response.userToken) {
              const userToken = response.userToken;

              // Mettre à jour le token dans le Redux store
              dispatch(setUserToken(userToken));
              console.log("Token récupéré :", userToken);
              console.log("Avant la redirection vers /profile");
              navigate('/profile')
             
            } else {
              // Réinitialiser le mot de passe en cas d'échec de connexion
              setPassword("");

              console.log(
                "Identifiants invalides. Veuillez vérifier votre email et mot de passe."
              );
            }
          })
      }
        catch(error)  {
          // Réinitialiser le mot de passe en cas d'erreur
          setPassword("");

          console.log("Erreur lors de la connexion:", error);
          console.log(
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
          );
        }
    } else {
      console.log(
        "L'adresse email n'est pas valide. Veuillez saisir une adresse email valide."
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

          <button type="submit" className="sign-in-button">
            SignIn
          </button>
          {loading && <p className="error-message">{loading}</p>}
        </form>
      </section>
    </main>
  );
}
