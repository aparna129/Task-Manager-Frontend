import React from "react";
import styles from "./SideHeader.module.css";
import promanageicon from "../../images/promanage-icon.png";
import boardicon from "../../images/board-icon.png";
import analyticsicon from "../../images/analytics-icon.png";
import settingsicon from "../../images/settings-icon.png";
import logouticon from "../../images/logout-icon.png";
import { useNavigate } from "react-router-dom";

function SideHeader({ value, setIsLogoutClicked }) {
  const navigate = useNavigate();

  const handleBoardClick = () => {
    navigate("/board");
  };

  const handleAnalyticsClick = () => {
    navigate("/analytics");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    setIsLogoutClicked(true);
  };

  return (
    <div className={styles.sideHeaderContainer}>
      <div className={styles.firstSection}>
        <div className={styles.flex}>
          <img
            className={styles.icons}
            src={promanageicon}
            alt="promanageicon"
          />
          <p className={styles.textProManage}>Pro Manage</p>
        </div>
      </div>

      <div className={styles.secondSection}>
        <div
          onClick={handleBoardClick}
          style={{
            background: value === "board" ? "#4391ed1a" : "",
            color: value === "board" ? "#000000" : "#707070",
          }}
          className={styles.board}
        >
          <img className={styles.icons} src={boardicon} alt="boardicon" />
          <p className={styles.text}>Board</p>
        </div>

        <div
          onClick={handleAnalyticsClick}
          style={{
            background: value === "analytics" ? "#4391ed1a" : "",
            color: value === "analytics" ? "#000000" : "#707070",
          }}
          className={styles.analytics}
        >
          <img
            className={styles.icons}
            src={analyticsicon}
            alt="analyticsicon"
          />
          <p className={styles.text}>Analytics</p>
        </div>

        <div
          onClick={handleSettingsClick}
          style={{
            background: value === "settings" ? "#4391ed1a" : "",
            color: value === "settings" ? "#000000" : "#707070",
          }}
          className={styles.settings}
        >
          <img className={styles.icons} src={settingsicon} alt="settingsicon" />
          <p className={styles.text}>Settings</p>
        </div>
      </div>

      <div className={styles.thirdSection}>
        <div onClick={handleLogoutClick} className={styles.logout}>
          <img className={styles.icons} src={logouticon} alt="logouticon" />
          <p className={styles.text}>Log out</p>
        </div>
      </div>
    </div>
  );
}

export default SideHeader;
