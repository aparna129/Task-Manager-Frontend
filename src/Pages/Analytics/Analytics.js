import React, { useState, useEffect } from "react";
import SideHeader from "../SharedComponents/SideHeader";
import styles from "./Analytics.module.css";
import LogoutPopup from "../SharedComponents/LogoutPopup";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function Analytics() {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);

  const [backlogCount, setBacklogCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [moderatePriorityCount, setModeratePriorityCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);
  const [dueDateTasks, setDueDateTasks] = useState(0);

  const baseUrl = localStorage.getItem("baseUrl");

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("jwtToken");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}getTaskNumbers/${userId}`, { headers })
      .then((response) => {
        const {
          backlogCount,
          todoCount,
          progressCount,
          doneCount,
          lowPriorityCount,
          moderatePriorityCount,
          highPriorityCount,
          dueDateTasks,
        } = response.data;
        setBacklogCount(backlogCount);
        setTodoCount(todoCount);
        setProgressCount(progressCount);
        setDoneCount(doneCount);
        setLowPriorityCount(lowPriorityCount);
        setModeratePriorityCount(moderatePriorityCount);
        setHighPriorityCount(highPriorityCount);
        setDueDateTasks(dueDateTasks);
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
          setError("An error occurred while getting remaining tasks");
        }
        console.log(error);
        setLoading(false);
      });
  });

  return (
    <div>
      <div className={styles.analyticsPage}>
        <div className={styles.sideHeader}>
          <SideHeader
            value="analytics"
            setIsLogoutClicked={setIsLogoutClicked}
          />
        </div>

        <div>
          <p className={styles.analyticsText}>Analytics</p>
          <div className={styles.taskSection}>
            <div className={styles.taskBox}>
              <ul className={styles.taskList} type="disc">
                <div className={styles.flex}>
                  <li className={styles.listItems}>Backlog Tasks</li>
                  <span className={styles.count}>
                    {backlogCount < 10 ? `0${backlogCount}` : backlogCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>To-do Tasks</li>
                  <span className={styles.count}>
                    {todoCount < 10 ? `0${todoCount}` : todoCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>In-Progress Tasks</li>
                  <span className={styles.count}>
                    {progressCount < 10 ? `0${progressCount}` : progressCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>Completed Tasks</li>
                  <span className={styles.count}>
                    {doneCount < 10 ? `0${doneCount}` : doneCount}
                  </span>
                </div>
              </ul>
            </div>

            <div className={styles.taskBox}>
              <ul className={styles.taskList} type="disc">
                <div className={styles.flex}>
                  <li className={styles.listItems}>Low Priority</li>
                  <span className={styles.count}>
                    {lowPriorityCount < 10
                      ? `0${lowPriorityCount}`
                      : lowPriorityCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>Moderate Priority</li>
                  <span className={styles.count}>
                    {moderatePriorityCount < 10
                      ? `0${moderatePriorityCount}`
                      : moderatePriorityCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>High Priority</li>
                  <span className={styles.count}>
                    {highPriorityCount < 10
                      ? `0${highPriorityCount}`
                      : highPriorityCount}
                  </span>
                </div>

                <div className={styles.flex}>
                  <li className={styles.listItems}>Due Date Tasks</li>
                  <span className={styles.count}>
                    {" "}
                    {dueDateTasks < 10 ? `0${dueDateTasks}` : dueDateTasks}
                  </span>
                </div>
              </ul>
            </div>
          </div>

          {loading && (
            <div className={styles.loaderContainer}>
              <div className={styles.loaderBackground} />
              <FadeLoader color={"#000000"} loading={loading} />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
      {isLogoutClicked && (
        <div className={styles.popup}>
          <LogoutPopup setIsLogoutClicked={setIsLogoutClicked} />
        </div>
      )}
    </div>
  );
}

export default Analytics;
