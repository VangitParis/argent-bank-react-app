import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/sass/pages/_profileStyles.scss";
import { connectUser } from "../../services/userService";
import { userToken } from "../../features/authSlice";


export default function Profile() {
  const dispatch = useDispatch();
  const {loading, userInfo, error } = useSelector((state) => state.auth);
 
  useEffect(() => {
    dispatch(connectUser({ authToken : userToken }));
  }, [dispatch, userToken, ]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
 
 
  const getFirstName = userInfo ? userInfo.firstName : "";
  const getLastName = userInfo ? userInfo.lastName : "";
 
  
  return (
    <main className="main bg-dark flex-column">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {getFirstName} {getLastName}
        </h1>
        <button className="edit-button">Edit Name</button>
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
