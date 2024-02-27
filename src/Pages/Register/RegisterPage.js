import React from "react";
import ImagePart from "../SharedComponents/ImagePart";
import RegisterPart from "./components/RegisterPart";
import styles from "./Register.module.css";

function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.imagePart}>
        <ImagePart />
      </div>
      <div className={styles.registerPart}>
        <RegisterPart />
      </div>
    </div>
  );
}

export default RegisterPage;
