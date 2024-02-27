import React, { useState } from "react";
import styles from "./CreateAndEditTaskPopup.module.css";
import deleteicon from "../../../images/delete-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FadeLoader from "react-spinners/FadeLoader";

function CreateTaskPopup({ setIsAddTaskBtnClicked }) {
  const [name, setName] = useState("");

  const [priority, setPriority] = useState("");

  const [checklistArray, setChecklistArray] = useState([]);

  const [dueDate, setDueDate] = useState(null);

  const handlePriority = (value) => {
    setPriority(value);
  };

  const handleAddNewBtn = () => {
    const newChecklistItem = {
      checked: false,
      value: "",
    };

    setChecklistArray([...checklistArray, newChecklistItem]);
  };

  const handleDeleteBtn = (index) => {
    const updatedChecklistArray = checklistArray.filter((_, i) => i !== index);
    setChecklistArray(updatedChecklistArray);
  };

  const handleCancelBtn = () => {
    setIsAddTaskBtnClicked(false);
  };

  const updateCheckedValue = (e, index) => {
    const updatedChecklistArray = [...checklistArray];
    updatedChecklistArray[index].checked = e.target.checked;
    setChecklistArray(updatedChecklistArray);
  };

  const updateTextValue = (e, index) => {
    const updatedChecklistArray = [...checklistArray];
    updatedChecklistArray[index].value = e.target.value;
    setChecklistArray(updatedChecklistArray);
  };

  const [error, setError] = useState("");

  const baseUrl = localStorage.getItem("baseUrl");

  const token = localStorage.getItem("jwtToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);

  const handleSaveBtn = () => {
    setIsSaveBtnClicked(true);
    const task = {
      name: name,
      priority: priority,
      checklistArray: checklistArray,
      dueDate: dueDate,
    };
    axios
      .post(`${baseUrl}createTask/${userId}`, task, { headers })
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
        setIsAddTaskBtnClicked(false);
        setError("");
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
          setError("An error occurred while creating task");
        }
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className={styles.createTaskPopup}>
      <div className={styles.title}>
        Title <span className={styles.star}>*</span>
      </div>

      <div>
        <form method="POST">
          <input
            className={styles.inputBox}
            type="text"
            placeholder="Enter Task Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </form>
      </div>

      <div className={styles.prioritySection}>
        <p className={styles.selectPriorityText}>
          Select Priority <span className={styles.star}>*</span>
        </p>
        <button
          onClick={(e) => handlePriority("HIGH PRIORITY")}
          style={{
            backgroundColor: priority === "HIGH PRIORITY" ? "#EEECEC" : "",
          }}
          className={styles.btn}
        >
          <div className={styles.everyBtn}>
            <div
              style={{ backgroundColor: "#FF2473" }}
              className={styles.circles}
            ></div>
            <div className={styles.btnText}>HIGH PRIORITY</div>
          </div>
        </button>

        <button
          onClick={(e) => handlePriority("MODERATE PRIORITY")}
          style={{
            backgroundColor: priority === "MODERATE PRIORITY" ? "#EEECEC" : "",
          }}
          className={styles.btn}
        >
          <div className={styles.everyBtn}>
            <div
              style={{ backgroundColor: "#18B0FF" }}
              className={styles.circles}
            ></div>
            <div className={styles.btnText}>MODERATE PRIORITY</div>
          </div>
        </button>

        <button
          onClick={(e) => handlePriority("LOW PRIORITY")}
          style={{
            backgroundColor: priority === "LOW PRIORITY" ? "#EEECEC" : "",
          }}
          className={styles.btn}
        >
          <div className={styles.everyBtn}>
            <div
              style={{ backgroundColor: "#63C05B" }}
              className={styles.circles}
            ></div>
            <div className={styles.btnText}>LOW PRIORITY</div>
          </div>
        </button>
      </div>

      <div className={styles.checklistSection}>
        <p className={styles.checklistText}>
          Checklist (
          {checklistArray.filter((item) => item.checked === true).length}/
          {checklistArray.length}) <span className={styles.star}>*</span>
        </p>
        <div className={styles.checklistArray}>
          {checklistArray.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                className={styles.checkBox}
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  updateCheckedValue(e, index);
                }}
              />
              <input
                className={styles.inputChecklists}
                type="text"
                value={item.value}
                onChange={(e) => {
                  updateTextValue(e, index);
                }}
                placeholder="Add a task"
              />
              <img
                onClick={(e) => handleDeleteBtn(index)}
                className={styles.deleteicon}
                src={deleteicon}
                alt="delete-icon"
              />
            </div>
          ))}
          <button onClick={handleAddNewBtn} className={styles.addNewBtn}>
            <span className={styles.plusIconBtn}>+</span> Add New
          </button>
        </div>
      </div>

      <div className={styles.lastSection}>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Select Due Date"
          className={styles.dueDateBtn}
        />
        <button onClick={handleCancelBtn} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleSaveBtn} className={styles.saveBtn}>
          Save
        </button>
      </div>

      {loading && isSaveBtnClicked && (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderBackground} />
          <FadeLoader color={"#000000"} loading={loading} />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default CreateTaskPopup;
