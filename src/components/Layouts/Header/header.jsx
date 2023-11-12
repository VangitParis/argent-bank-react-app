import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/argentBankLogo.png";
import "../../../styles/sass/layouts/_headerStyles.scss";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
// import { userToken } from "../../../features/userSlice";
import { resetUser } from "../../../features/authSlice";
export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { userUpdateInfo } = useSelector((state) => state.update);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConnected = localStorage.getItem("userToken");

  // Fonction de déconnexion
  const handleLogout = () => {

    // Supprimer la clé du token de l'utilisateur du localStorage
    localStorage.removeItem("userToken");
    // Dispatch l'action de déconnexion pour réinitialiser l'état de l'utilisateur
    dispatch(resetUser());

    // Rediriger vers la page de connexion
    navigate("/login");
  };

  const getFirstName = userInfo ? userInfo.firstName : "";
  const getUpdateFirstName = userUpdateInfo ? userUpdateInfo.firstName : "";

  let firstName = "";

  if (userUpdateInfo) {
    firstName = getUpdateFirstName;
  } else {
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
        <div>
          {/* Vérifier si un utilisateur est connecté et afficher le bouton de déconnexion si c'est le cas */}
          {isConnected ? (
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {firstName}
              </Link>
              <Link
                className="main-nav-item"
                to="/login"
                onClick={handleLogout}
              >
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
