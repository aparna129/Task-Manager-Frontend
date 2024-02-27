import React, { useState } from "react";
import styles from "../Register.module.css";
import nameicon from "../../../images/name-icon.png";
import emailicon from "../../../images/email-icon.png";
import lockicon from "../../../images/lock-icon.png";
import viewicon from "../../../images/view-icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function RegisterPart() {
  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

  const [viewPwd, setViewPwd] = useState(false);
  const [viewConfirmPwd, setViewConfirmPwd] = useState(false);

  const handleViewPwdClick = () => {
    setViewPwd(!viewPwd);
  };

  const handleViewConfirmPwdClick = () => {
    setViewConfirmPwd(!viewConfirmPwd);
  };

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setUserdata({ ...userdata, [field]: value });
  };

  const [error, setError] = useState("");

  const baseUrl = localStorage.getItem("baseUrl");

  const [loading, setLoading] = useState(true);
  const [registerBtnClicked, setIsRegisterBtnClicked] = useState(false);

  const handleRegisterBtn = () => {
    setIsRegisterBtnClicked(true);
    axios
      .post(`${baseUrl}register`, userdata)
      .then((response) => {
        const { message } = response.data;
        setError("");
        setUserdata({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success(message);
        setIsRegisterBtnClicked(false);
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while creating the user");
        }
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles.register}>Register</div>
      <div className={styles.formSection}>
        <form method="POST">
          <div className={styles.inputContainer}>
            <img src={nameicon} alt="nameicon" className={styles.icon} />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Name"
              value={userdata.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            ></input>
          </div>

          <div className={styles.inputContainer}>
            <img src={emailicon} alt="emailicon" className={styles.icon} />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Email"
              value={userdata.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            ></input>
          </div>

          <div className={styles.inputContainer}>
            <img src={lockicon} alt="lockicon" className={styles.icon} />
            <img
              onClick={handleViewPwdClick}
              src={viewicon}
              alt="viewicon"
              className={styles.viewicon}
            />
            <input
              className={styles.inputField}
              type={viewPwd ? "text" : "password"}
              placeholder="Password"
              value={userdata.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            ></input>
          </div>

          <div className={styles.inputContainer}>
            <img src={lockicon} alt="lockicon" className={styles.icon} />
            <img
              onClick={handleViewConfirmPwdClick}
              src={viewicon}
              alt="viewicon"
              className={styles.viewicon}
            />
            <input
              className={styles.inputField}
              type={viewConfirmPwd ? "text" : "password"}
              placeholder="Confirm Password"
              value={userdata.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            ></input>
          </div>
        </form>

        {registerBtnClicked && error && (
          <div className={styles.error}>{error}</div>
        )}

        {loading && registerBtnClicked && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderBackground} />
            <FadeLoader color={"#000000"} loading={loading} />
          </div>
        )}

        <div className={error ? styles.btnSection11 : styles.btnSection1}>
          <button onClick={handleRegisterBtn} className={styles.registerBtn}>
            Register
          </button>
        </div>

        <p className={styles.haveAccountText}>Have an account ?</p>

        <div className={styles.btnSection2}>
          <button onClick={handleLoginBtn} className={styles.loginBtn}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPart;
