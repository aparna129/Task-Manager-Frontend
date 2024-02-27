import React from "react";
import styles from "./ImagePart.module.css";
import icon1 from "../../images/icon1.png";

function ImagePart() {
  return (
    <div>
      <div className={styles.circle}></div>
      <img className={styles.image} src={icon1} alt="icon1" />
      <p className={styles.text1}>Welcome aboard my friend </p>
      <p className={styles.text2}>just a couple of clicks and we start</p>
    </div>
  );
}

export default ImagePart;
