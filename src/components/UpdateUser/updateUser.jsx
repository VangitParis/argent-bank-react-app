import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../../services/userService";
import { userToken } from "../../features/authSlice";

export default function UpdateUser() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(
    userInfo ? userInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(userInfo ? userInfo.lastName : "");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(
      updateUserProfile({
        firstName,
        lastName,
        authToken: userToken,
      })
    );
    setIsEditing(false);
  };

  useEffect(() => {
    // Ici, vous pouvez vous connecter à Redux si nécessaire
  }, [dispatch]);

  const handleCancelClick = () => {
    // Annuler les modifications et réinitialisez les champs
    setIsEditing(false);
    setFirstName(userInfo ? userInfo.firstName : "");
    setLastName(userInfo ? userInfo.lastName : "");
  };



  return (
    <div className="update-user-container">
      <h1>
        Welcome back
        <br />
        {isEditing ? (
          <>
            <div className="flex-center edit-form">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex-center">
              <button className="edit-button-update" onClick={handleSaveClick}>
                Save
              </button>
              <button
                className="edit-button-update"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              {firstName} {lastName} !
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </h1>
    </div>
  );
}
