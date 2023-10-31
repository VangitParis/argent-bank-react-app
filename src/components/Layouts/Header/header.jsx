import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/argentBankLogo.png";
import "../../../styles/sass/layouts/_headerStyles.scss";

export default function Header() {
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
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
