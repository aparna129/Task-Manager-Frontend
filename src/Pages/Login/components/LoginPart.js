import React, { useState } from "react";
import styles from "../Login.module.css";
import emailicon from "../../../images/email-icon.png";
import lockicon from "../../../images/lock-icon.png";
import viewicon from "../../../images/view-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";

function LoginPart() {
  const [viewClicked, setViewClicked] = useState(false);

  const handleViewClick = () => {
    setViewClicked(!viewClicked);
  };

  const navigate = useNavigate();

  const handleRegisterBtn = () => {
    navigate("/");
  };

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setLogindata({ ...logindata, [field]: value });
  };

  const [error, setError] = useState("");

  const baseUrl = localStorage.getItem("baseUrl");

  const [loading, setLoading] = useState(true);
  const [loginBtnClicked, setIsLoginBtnClicked] = useState(false);

  const handleLoginBtn = () => {
    setIsLoginBtnClicked(true);
    axios
      .post(`${baseUrl}login`, logindata)
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
        const { jwttoken } = response.data;
        localStorage.setItem("jwtToken", jwttoken);
        const { userId } = response.data;
        localStorage.setItem("userId", userId);
        const { name } = response.data;
        localStorage.setItem("username", name);
        setError("");
        setLogindata({
          email: "",
          password: "",
        });
        setIsLoginBtnClicked(false);
        setLoading(false);
        navigate("/board");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred while log in");
        }
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles.login}>Login</div>
      <div className={styles.formSection}>
        <form method="POST">
          <div className={styles.inputContainer}>
            <img src={emailicon} alt="emailicon" className={styles.icon} />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Email"
              value={logindata.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            ></input>
          </div>

          <div className={styles.inputContainer}>
            <img src={lockicon} alt="lockicon" className={styles.icon} />
            <img
              onClick={handleViewClick}
              src={viewicon}
              alt="viewicon"
              className={styles.viewicon}
            />
            <input
              className={styles.inputField}
              type={viewClicked ? "text" : "password"}
              placeholder="Password"
              value={logindata.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            ></input>
          </div>
        </form>

        {loginBtnClicked && error && (
          <div className={styles.error}>{error}</div>
        )}

        {loading && loginBtnClicked && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderBackground} />
            <FadeLoader color={"#000000"} loading={loading} />
          </div>
        )}

        <div className={styles.btnSection1}>
          <button onClick={handleLoginBtn} className={styles.loginBtn}>
            Log in
          </button>
        </div>

        <p className={styles.haveAccountText}>Have no account yet?</p>

        <div className={styles.btnSection2}>
          <button onClick={handleRegisterBtn} className={styles.registerBtn}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPart;
