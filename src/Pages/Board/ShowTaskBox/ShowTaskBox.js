import React, { useState, useEffect } from "react";
import styles from "./ShowTaskBox.module.css";
import expandicon from "../../../images/expand-icon.png";
import collapseicon from "../../../images/collapse-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteTaskPopup from "../DeleteTaskPopup/DeleteTaskPopup";
import EditTaskPopup from "../CreateAndEditTaskPopup/EditTaskPopup";

function ShowTaskBox({
  task,
  isCollapseClicked,
  lastClickedTaskId,
  handleLastClickedTask,
}) {
  const [isExpandBtnClicked, setIsExpandBtnClicked] = useState(false);

  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] = useState(false);

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [isEditClicked, setIsEditClicked] = useState(false);

  const [dotsClicked, setDotsClicked] = useState(false);

  const handleDots = () => {
    setIsEditDeletePopupOpen(true);
    setDotsClicked(true);
    handleLastClickedTask(task._id);
  };

  const isCurrentTaskClicked = lastClickedTaskId === task._id;

  const handleDeleteClicked = () => {
    setIsDeleteClicked(true);
  };

  const handleEditClicked = () => {
    setIsEditClicked(true);
  };

  const handleShareClick = () => {
    const link = `http://localhost:3000/task/${task._id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard");
      setIsEditDeletePopupOpen(false);
      setDotsClicked(false);
    });
  };

  useEffect(() => {
    setIsExpandBtnClicked(false);
  }, [isCollapseClicked]);

  const baseUrl = localStorage.getItem("baseUrl");

  const token = localStorage.getItem("jwtToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const userId = localStorage.getItem("userId");

  const handleUpdatePhase = (phase, taskId) => {
    axios
      .patch(
        `${baseUrl}updateTaskPhase/${userId}/${taskId}`,
        { phase },
        { headers }
      )
      .then((response) => {
        const { message } = response.data;
        toast.success(message);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        } else {
          console.log("An error occurred while updating task phase");
        }
        console.log(error);
      });
  };

  const dueDateTime = new Date(task.dueDate).getTime();
  const currentDateTime = new Date().getTime();
  const isOverdue = dueDateTime < currentDateTime;

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      style={{
        position: dotsClicked && isCurrentTaskClicked ? "relative" : "",
      }}
      className={styles.taskBox}
    >
      <div className={styles.headingSection}>
        <div className={styles.priority}>
          <div
            className={styles.circles}
            style={{
              backgroundColor:
                task.priority === "HIGH PRIORITY"
                  ? "#FF2473"
                  : task.priority === "LOW PRIORITY"
                  ? "#63C05B"
                  : "#18B0FF",
            }}
          ></div>
          <div className={styles.priorityText}>{task.priority}</div>
        </div>
        <div onClick={handleDots} className={styles.dots}>
          ...
        </div>
      </div>

      <p className={styles.taskName}>{task.name}</p>

      <div className={styles.checklistSection}>
        <p className={styles.checklistText}>
          Checklist (
          {task.checklistArray &&
            task.checklistArray.filter((item) => item.checked === true).length}
          /{task.checklistArray && task.checklistArray.length})
        </p>
        <img
          onClick={(e) => setIsExpandBtnClicked(!isExpandBtnClicked)}
          className={styles.expandicon}
          src={isExpandBtnClicked ? collapseicon : expandicon}
          alt="expand-icon"
        />
      </div>

      <div>
        {isExpandBtnClicked && task && task.checklistArray && (
          <div className={styles.checklistArray}>
            {task.checklistArray.map((checklist, index) => (
              <div key={index} className={styles.checklistItem}>
                <input
                  type="text"
                  value={checklist.value}
                  className={styles.inputBox}
                />
                <input
                  type="checkbox"
                  checked={checklist.checked}
                  className={styles.checkbox}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {task && task.phase === "Backlog" && (
        <div className={styles.btnSection}>
          <div className={styles.dueDateSection}>
            {task.dueDate && (
              <button
                style={{
                  backgroundColor: isOverdue ? "#CF3636" : "",
                  color: isOverdue ? "#FFFFFF" : "",
                }}
                className={styles.date}
              >
                {formattedDate}
              </button>
            )}
          </div>
          <button
            onClick={(e) => handleUpdatePhase("Progress", task._id)}
            className={styles.phaseBtn}
          >
            PROGRESS
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Todo", task._id)}
            className={styles.phaseBtn}
          >
            TODO
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Done", task._id)}
            className={styles.phaseBtn}
          >
            DONE
          </button>
        </div>
      )}

      {task && task.phase === "Todo" && (
        <div className={styles.btnSection}>
          <div className={styles.dueDateSection}>
            {task.dueDate && (
              <button
                style={{
                  backgroundColor: isOverdue ? "#CF3636" : "",
                  color: isOverdue ? "#FFFFFF" : "",
                }}
                className={styles.date}
              >
                {formattedDate}
              </button>
            )}
          </div>
          <button
            onClick={(e) => handleUpdatePhase("Backlog", task._id)}
            className={styles.phaseBtn}
          >
            BACKLOG
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Progress", task._id)}
            className={styles.phaseBtn}
          >
            PROGRESS
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Done", task._id)}
            className={styles.phaseBtn}
          >
            DONE
          </button>
        </div>
      )}

      {task && task.phase === "Progress" && (
        <div className={styles.btnSection}>
          <div className={styles.dueDateSection}>
            {task.dueDate && (
              <button
                style={{
                  backgroundColor: isOverdue ? "#CF3636" : "",
                  color: isOverdue ? "#FFFFFF" : "",
                }}
                className={styles.date}
              >
                {formattedDate}
              </button>
            )}
          </div>
          <button
            onClick={(e) => handleUpdatePhase("Backlog", task._id)}
            className={styles.phaseBtn}
          >
            BACKLOG
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Todo", task._id)}
            className={styles.phaseBtn}
          >
            TODO
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Done", task._id)}
            className={styles.phaseBtn}
          >
            DONE
          </button>
        </div>
      )}

      {task && task.phase === "Done" && (
        <div className={styles.btnSection}>
          <div className={styles.dueDateSection}>
            {task.dueDate && (
              <button
                style={{ backgroundColor: "#63C05B", color: "#FFFFFF" }}
                className={styles.date}
              >
                {formattedDate}
              </button>
            )}
          </div>
          <button
            onClick={(e) => handleUpdatePhase("Backlog", task._id)}
            className={styles.phaseBtn}
          >
            BACKLOG
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Todo", task._id)}
            className={styles.phaseBtn}
          >
            TODO
          </button>
          <button
            onClick={(e) => handleUpdatePhase("Progress", task._id)}
            className={styles.phaseBtn}
          >
            PROGRESS
          </button>
        </div>
      )}

      {isEditDeletePopupOpen && isCurrentTaskClicked && (
        <div className={styles.popup}>
          <div className={styles.editDeletePopup}>
            <p
              onClick={handleEditClicked}
              className={styles.editDeletePopupText}
            >
              Edit
            </p>
            <p
              onClick={handleShareClick}
              className={styles.editDeletePopupText}
            >
              Share
            </p>
            <p
              onClick={handleDeleteClicked}
              className={styles.editDeletePopupDeleteText}
            >
              Delete
            </p>
          </div>
        </div>
      )}

      {isDeleteClicked && (
        <div className={styles.editAndDeletePopup}>
          <DeleteTaskPopup
            taskId={task._id}
            setIsDeleteClicked={setIsDeleteClicked}
            setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
            setDotsClicked={setDotsClicked}
          />
        </div>
      )}

      {isEditClicked && (
        <div className={styles.editAndDeletePopup}>
          <EditTaskPopup
            task={task}
            setIsEditClicked={setIsEditClicked}
            setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
            setDotsClicked={setDotsClicked}
          />
        </div>
      )}
    </div>
  );
}

export default ShowTaskBox;
