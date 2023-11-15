import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/sass/pages/_errorStyles.scss';
import { useSelector, useDispatch } from "react-redux";
import { connectUser } from "../../services/userService";

export default function Error() {
  /**
   * Quand je suis connecté et que j'entre une url erronée : je veux que le header garde le prénom et le sign Out
   * Quand je suis déconnecté et que j'entre une url erronée : je veux que le header me demande de me connecter avec sign In
   */
  const dispatch = useDispatch();
 const userToken = useSelector((state)=>state.auth.userToken)

 useEffect(() => {
  // userToken est présent, connecter l'utilisateur
  if (userToken) {
    dispatch(connectUser({ authToken: userToken }));
  } 
  
}, [dispatch, userToken]);


  return (
    <main className="main-error">
      <section className="error-content">
        <i className="fa fa-exclamation-circle error-icon"></i>
        <h1 className="title-error">Oops! The page you&apos;re looking for seems to be missing.</h1>
        <p>An error occurred, or the page may no longer exist.</p>
        <p>Let&apos;s go back to the</p>
        <Link to="/">
          <button className="home-button">Home Page</button>
        </Link>
      </section>
    </main>
  );
}
