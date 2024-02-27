import React from "react";
import styles from "./LogoutPopup.module.css";
import { useNavigate } from "react-router-dom";

function LogoutPopup({ setIsLogoutClicked }) {
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    navigate("/login");
  };

  const handleCancelBtn = () => {
    setIsLogoutClicked(false);
  };

  return (
    <div className={styles.logoutBox}>
      <p className={styles.logoutText}>Are you sure you want to Logout?</p>
      <button onClick={handleLogoutBtn} className={styles.logoutBtn}>
        Yes, Logout
      </button>
      <button onClick={handleCancelBtn} className={styles.cancelBtn}>
        Cancel
      </button>
    </div>
  );
}

export default LogoutPopup;
