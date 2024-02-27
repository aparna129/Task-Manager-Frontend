import React, { useState } from "react";
import styles from "./Settings.module.css";
import SideHeader from "../SharedComponents/SideHeader";
import LogoutPopup from "../SharedComponents/LogoutPopup";
import nameicon from "../../images/name-icon.png";
import lockicon from "../../images/lock-icon.png";
import viewicon from "../../images/view-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";

function Settings() {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);

  const name = localStorage.getItem("username");

  const [updatedData, setUpdatedData] = useState({
    username: name,
    oldPwd: "",
    newPwd: "",
  });

  const [viewClicked1, setViewClicked1] = useState(false);

  const handleViewClick1 = () => {
    setViewClicked1(!viewClicked1);
  };

  const [viewClicked2, setViewClicked2] = useState(false);

  const handleViewClick2 = () => {
    setViewClicked2(!viewClicked2);
  };

  const handleInputChange = (field, value) => {
    setUpdatedData({ ...updatedData, [field]: value });
  };

  const [error, setError] = useState("");

  const baseUrl = localStorage.getItem("baseUrl");

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("jwtToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [loading, setLoading] = useState(true);
  const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false);

  const handleUpdateBtn = () => {
    setIsUpdateBtnClicked(true);
    axios
      .patch(`${baseUrl}updateUserInfo/${userId}`, updatedData, { headers })
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
        const { name } = response.data;
        localStorage.setItem("username", name);
        setError("");
        setUpdatedData({
          username: name,
          oldPwd: "",
          newPwd: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while updating user info");
        }
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles.settingsPage}>
        <div className={styles.sideHeader}>
          <SideHeader
            value="settings"
            setIsLogoutClicked={setIsLogoutClicked}
          />
        </div>

        <div className={styles.settingsSection}>
          <p className={styles.settingsText}>Settings</p>

          <div className={styles.formSection}>
            <form method="POST">
              <div className={styles.inputContainer}>
                <img src={nameicon} alt="nameicon" className={styles.icon} />
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="Name"
                  value={updatedData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                ></input>
              </div>

              <div className={styles.inputContainer}>
                <img src={lockicon} alt="lockicon" className={styles.icon} />
                <img
                  onClick={handleViewClick1}
                  src={viewicon}
                  alt="viewicon"
                  className={styles.viewicon}
                />
                <input
                  className={styles.inputField}
                  type={viewClicked1 ? "text" : "password"}
                  placeholder="Old Password"
                  value={updatedData.oldPwd}
                  onChange={(e) => handleInputChange("oldPwd", e.target.value)}
                ></input>
              </div>

              <div className={styles.inputContainer}>
                <img src={lockicon} alt="lockicon" className={styles.icon} />
                <img
                  onClick={handleViewClick2}
                  src={viewicon}
                  alt="viewicon"
                  className={styles.viewicon}
                />
                <input
                  className={styles.inputField}
                  type={viewClicked2 ? "text" : "password"}
                  placeholder="New Password"
                  value={updatedData.newPwd}
                  onChange={(e) => handleInputChange("newPwd", e.target.value)}
                ></input>
              </div>
            </form>
          </div>

          <div>
            <button onClick={handleUpdateBtn} className={styles.updateBtn}>
              Update
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>

      {loading && isUpdateBtnClicked && (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderBackground} />
          <FadeLoader color={"#000000"} loading={loading} />
        </div>
      )}

      {isLogoutClicked && (
        <div className={styles.popup}>
          <LogoutPopup setIsLogoutClicked={setIsLogoutClicked} />
        </div>
      )}
    </div>
  );
}

export default Settings;
