import React, { useState } from "react";
import styles from "./DeleteTaskPopup.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";

function DeleteTaskPopup({
  taskId,
  setIsDeleteClicked,
  setIsEditDeletePopupOpen,
  setDotsClicked,
}) {
  const [error, setError] = useState("");

  const baseUrl = localStorage.getItem("baseUrl");

  const token = localStorage.getItem("jwtToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);

  const handleDeleteBtn = () => {
    setIsDeleteBtnClicked(true);
    axios
      .delete(`${baseUrl}deleteTasks/${userId}/${taskId}`, { headers })
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
        setIsDeleteClicked(false);
        setIsEditDeletePopupOpen(false);
        setDotsClicked(false);
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
          setError("An error occurred while deleting task");
        }
        console.log(error);
        setLoading(false);
      });
  };

  const handleCancelBtn = () => {
    setIsDeleteClicked(false);
    setIsEditDeletePopupOpen(false);
    setDotsClicked(false);
  };

  return (
    <div className={styles.deleteTaskBox}>
      <div className={styles.text}>Are you sure you want to Delete?</div>
      <button onClick={handleDeleteBtn} className={styles.deleteBtn}>
        Yes, Delete
      </button>
      <button onClick={handleCancelBtn} className={styles.cancelBtn}>
        Cancel
      </button>

      {loading && isDeleteBtnClicked && (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderBackground} />
          <FadeLoader color={"#000000"} loading={loading} />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default DeleteTaskPopup;
