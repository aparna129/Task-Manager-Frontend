import React, { useState, useEffect } from "react";
import styles from "./PublicPage.module.css";
import { useParams } from "react-router-dom";
import promanageicon from "../../images/promanage-icon.png";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function PublicPage() {
  const { taskId } = useParams();

  const [task, setTask] = useState(null);
  const [checklistDoneCount, setChecklistDoneCount] = useState(0);

  const baseUrl = localStorage.getItem("baseUrl");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}getTaskById/${taskId}`)
      .then((response) => {
        const { task } = response.data;
        setTask(task);
        const { checklistDoneCount } = response.data;
        setChecklistDoneCount(checklistDoneCount);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        } else {
          console.log("An error occurred while getting task");
        }
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  });

  const dueDateTime = task ? new Date(task.dueDate).getTime() : null;
  const currentDateTime = new Date().getTime();
  const isOverdue = task && dueDateTime < currentDateTime;

  const formattedDate =
    task && task.dueDate
      ? new Date(task.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : null;

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loaderBackground} />
        <FadeLoader color={"#000000"} loading={loading} />
      </div>
    );
  }

  if (task) {
    return (
      <div>
        {task && (
          <div className={styles.outerBox}>
            <div className={styles.flex}>
              <img
                className={styles.icons}
                src={promanageicon}
                alt="promanageicon"
              />
              <p className={styles.textProManage}>Pro Manage</p>
            </div>
            <div className={styles.innerBox}>
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

              <div className={styles.name}>{task.name}</div>

              <div className={styles.checklist}>
                Checklist ({checklistDoneCount}/{task.checklistArray.length})
              </div>

              <div className={styles.checklistArray}>
                {task.checklistArray.map((checklist, index) => (
                  <div key={index} className={styles.inputContainer}>
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

              {task.dueDate && (
                <div className={styles.dateSection}>
                  <p className={styles.dueDate}>Due Date</p>
                  <p
                    style={{
                      backgroundColor: isOverdue ? "#CF3636" : "#DBDBDB",
                      color: isOverdue ? "#ffffff" : "#5A5A5A",
                    }}
                    className={styles.date}
                  >
                    {formattedDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  if (!task && task === null) {
    return <div className={styles.taskNotFound}>Oops ! Task Doesn't Exist</div>;
  }
}
export default PublicPage;
