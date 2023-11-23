import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../../components/Hero/hero";
import Features from "../../components/Features/features";
import { connectUser } from "../../services/userService";

export default function Home() {
 
  const userToken = useSelector((state) => state.auth.userToken)
  
  const dispatch = useDispatch();

  const [email] = useState("");
  

  useEffect(() => {
    
    // userToken est présent, reconnecter l'utilisateur si il remember
    if (userToken) {
      // Dispatch l'action pour mettre à jour l'email à retenir
      dispatch(connectUser({ email, userToken }));
      
    }
  }, [dispatch, email, userToken]);
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
