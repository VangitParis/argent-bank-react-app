import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/argentBankLogo.png";
import "../../../styles/sass/layouts/_headerStyles.scss";
import { useNavigate } from "react-router-dom/dist";
import { useSelector } from "react-redux";

export default function Header() {
  const {userInfo} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const isConnected = localStorage.getItem("userToken");

  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimer la clé du token de l'utilisateur du localStorage
    localStorage.clear("userToken")
    navigate("/login")
  };

  const getFirstName = userInfo ? userInfo.firstName : "";


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
        <div>
          {/* Vérifier si un utilisateur est connecté et afficher le bouton de déconnexion si c'est le cas */}
          {isConnected ? (
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {getFirstName}
              </Link>
              <Link className="main-nav-item" to="/login" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign Out
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
