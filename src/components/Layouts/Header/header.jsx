import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/argentBankLogo.png";
import "../../../styles/sass/layouts/_headerStyles.scss";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthUser } from "../../../features/authSlice";
import { resetUpdateUser } from "../../../features/updateSlice";
import { resetUser } from "../../../features/userSlice";
import { selectAuthUser, selectUpdateUser } from "../../../utils/selectors";

export default function Header() {
  const { userInfo } = useSelector(selectAuthUser);
  const { userUpdateInfo } = useSelector(selectUpdateUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConnected = localStorage.getItem("userToken");

  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimer la clé du token de l'utilisateur du localStorage
    localStorage.removeItem("userToken");
    // Dispatch l'action de déconnexion pour réinitialiser l'état de l'utilisateur
    dispatch(resetUser());
    dispatch(resetAuthUser());
    dispatch(resetUpdateUser());
    
    // Rediriger vers la page d'accueil'
    navigate("/");
  };

  const getFirstName = userInfo ? userInfo.firstName : "";
  const getUpdateFirstName = userUpdateInfo ? userUpdateInfo.firstName : "";

  let firstName = "";

  if (userUpdateInfo) {
    firstName = getUpdateFirstName;
  } else if (userInfo) {
    firstName = getFirstName;
  }

  return (
    <header>
      <nav className="main-nav">
        {/* Logo */}
        <Link to="/" className="main-nav-logo">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="flex-center">
          {/* Vérifier si un utilisateur est connecté et afficher le bouton de déconnexion si c'est le cas */}
          {isConnected ? (
            <>
              <Link className="main-nav-item flex-center" to="/profile">
                <i className="fa fa-user-circle"></i>
                {firstName}
              </Link>
              <Link
                className="main-nav-item flex-center"
                to="/"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out"></i>
                <p className="text-hide-mobile">Sign Out</p>
              </Link>
            </>
          ) : (
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
