import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/sass/pages/_profileStyles.scss";
import { connectUser } from "../../services/userService";

import UpdateUser from "../../components/UpdateUser/updateUser";

export default function Profile() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const userToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    console.log('USEEFFECT ====', userToken);
    if (!userToken) {
      // Si le userToken n'est pas présent dans le state, rediriger vers la page de connexion
      console.log("Pas de userToken, redirection vers la page de connexion");
    } else {
      // Si le userToken est présent, connecter l'utilisateur
      console.log("CONNEXION ???");
      dispatch(connectUser({ authToken: userToken }));
    }
  }, [dispatch, userToken]);


 

     return loading ? (
      <main className="main">Loading...</main>
    ) : error ? (
      <main className="main">Error: {error}</main>
    ) : (
      <main className="main bg-dark flex-column">
        <div className="header">
          <UpdateUser />
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    );
  
  }
