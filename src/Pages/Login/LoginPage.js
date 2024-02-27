import React from "react";
import ImagePart from "../SharedComponents/ImagePart";
import LoginPart from "./components/LoginPart";
import styles from "./Login.module.css";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.imagePart}>
        <ImagePart />
      </div>
      <div className={styles.loginPart}>
        <LoginPart />
      </div>
    </div>
  );
}

export default LoginPage;
