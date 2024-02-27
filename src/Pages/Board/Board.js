import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
import SideHeader from "../SharedComponents/SideHeader";
import LogoutPopup from "../SharedComponents/LogoutPopup";
import expandcollapseicon from "../../images/expandcollapse-icon.png";
import plusicon from "../../images/plus-icon.png";
import CreateTaskPopup from "./CreateAndEditTaskPopup/CreateTaskPopup.js";
import axios from "axios";
import ShowTaskBox from "./ShowTaskBox/ShowTaskBox.js";
import FadeLoader from "react-spinners/FadeLoader";

function Board() {
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);

  const [isAddTaskBtnClicked, setIsAddTaskBtnClicked] = useState(false);

  const [isBacklogCollapsed, setIsBacklogCollapsed] = useState(false);
  const [isTodoCollapsed, setIsTodoCollapsed] = useState(false);
  const [isProgressCollapsed, setIsProgressCollapsed] = useState(false);
  const [isDoneCollapsed, setIsDoneCollapsed] = useState(false);

  const [loading, setLoading] = useState(true);

  const handleCollapseClick = (section) => {
    switch (section) {
      case "Backlog":
        setIsBacklogCollapsed((prevState) => !prevState);
        break;
      case "Todo":
        setIsTodoCollapsed((prevState) => !prevState);
        break;
      case "Progress":
        setIsProgressCollapsed((prevState) => !prevState);
        break;
      case "Done":
        setIsDoneCollapsed((prevState) => !prevState);
        break;
      default:
        break;
    }
  };

  const handlePlusIcon = () => {
    setIsAddTaskBtnClicked(true);
  };

  const [selectedOption, setSelectedOption] = useState("This Week");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const baseUrl = localStorage.getItem("baseUrl");

  const token = localStorage.getItem("jwtToken");

  const name = localStorage.getItem("username");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const userId = localStorage.getItem("userId");

  const [error, setError] = useState("");

  const [backlogTasks, setBacklogTasks] = useState(null);
  const [todoTasks, setTodoTasks] = useState(null);
  const [progressTasks, setProgressTasks] = useState(null);
  const [doneTasks, setDoneTasks] = useState(null);

  const [lastClickedTaskId, setLastClickedTaskId] = useState(null);

  const handleLastClickedTask = (taskId) => {
    setLastClickedTaskId(taskId);
  };

  useEffect(() => {
    axios
      .post(
        `${baseUrl}getPhaseWiseTasks/${userId}`,
        { selectedOption },
        { headers }
      )
      .then((response) => {
        const { backlogTasks, todoTasks, progressTasks, doneTasks } =
          response.data;
        setBacklogTasks(backlogTasks);
        setTodoTasks(todoTasks);
        setProgressTasks(progressTasks);
        setDoneTasks(doneTasks);
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
          setError("An error occurred while getting phase wise tasks");
        }
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [backlogTasks, todoTasks, progressTasks, doneTasks, selectedOption]);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString("en-US", { month: "short" });
    const year = formattedDate.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const todayDate = formatDate(new Date());

  return (
    <div>
      <div className={styles.boardPage}>
        <div className={styles.sideHeader}>
          <SideHeader value="board" setIsLogoutClicked={setIsLogoutClicked} />
        </div>

        <div className={styles.rightSide}>
          <div className={styles.flex}>
            <p className={styles.name}>Welcome! {name}</p>
            <p className={styles.date}>{todayDate}</p>
          </div>

          <div className={styles.flex}>
            <p className={styles.boardText}>Board</p>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className={styles.thisWeekSection}
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.boxSection}>
            <div className={styles.box}>
              <div className={styles.backlogSection}>
                <div className={styles.headingSection}>
                  <p className={styles.phaseText}>Backlog</p>
                  <img
                    onClick={() => handleCollapseClick("Backlog")}
                    className={styles.expandcollapseicon2}
                    src={expandcollapseicon}
                    alt="expand-collapse-icon"
                  />
                </div>
                <div className={styles.allTasks}>
                  {backlogTasks &&
                    backlogTasks.map((task, index) => (
                      <div key={index}>
                        <ShowTaskBox
                          task={task}
                          isCollapseClicked={isBacklogCollapsed}
                          lastClickedTaskId={lastClickedTaskId}
                          handleLastClickedTask={handleLastClickedTask}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.todoSection}>
                <div className={styles.headingSection}>
                  <p className={styles.phaseText}>To do</p>
                  <img
                    className={styles.plusicon}
                    src={plusicon}
                    alt="plus-icon"
                    onClick={handlePlusIcon}
                  />
                  <img
                    onClick={() => handleCollapseClick("Todo")}
                    className={styles.expandcollapseicon}
                    src={expandcollapseicon}
                    alt="expand-collapse-icon"
                  />
                </div>
                <div className={styles.allTasks}>
                  {todoTasks &&
                    todoTasks.map((task, index) => (
                      <div key={index}>
                        <ShowTaskBox
                          task={task}
                          isCollapseClicked={isTodoCollapsed}
                          lastClickedTaskId={lastClickedTaskId}
                          handleLastClickedTask={handleLastClickedTask}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.progressSection}>
                <div className={styles.headingSection}>
                  <p className={styles.phaseText}>In progress</p>
                  <img
                    onClick={() => handleCollapseClick("Progress")}
                    className={styles.expandcollapseicon2}
                    src={expandcollapseicon}
                    alt="expand-collapse-icon"
                  />
                </div>
                <div className={styles.allTasks}>
                  {progressTasks &&
                    progressTasks.map((task, index) => (
                      <div key={index}>
                        <ShowTaskBox
                          task={task}
                          isCollapseClicked={isProgressCollapsed}
                          lastClickedTaskId={lastClickedTaskId}
                          handleLastClickedTask={handleLastClickedTask}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.doneSection}>
                <div className={styles.headingSection}>
                  <p className={styles.phaseText}> Done</p>
                  <img
                    onClick={() => handleCollapseClick("Done")}
                    className={styles.expandcollapseicon2}
                    src={expandcollapseicon}
                    alt="expand-collapse-icon"
                  />
                </div>
                <div className={styles.allTasks}>
                  {doneTasks &&
                    doneTasks.map((task, index) => (
                      <div key={index}>
                        <ShowTaskBox
                          task={task}
                          isCollapseClicked={isDoneCollapsed}
                          lastClickedTaskId={lastClickedTaskId}
                          handleLastClickedTask={handleLastClickedTask}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loaderBackground} />
          <FadeLoader color={"#000000"} loading={loading} />
        </div>
      )}

      {isLogoutClicked && (
        <div className={styles.popup}>
          <LogoutPopup setIsLogoutClicked={setIsLogoutClicked} />
        </div>
      )}

      {isAddTaskBtnClicked && (
        <div className={styles.popup}>
          <CreateTaskPopup setIsAddTaskBtnClicked={setIsAddTaskBtnClicked} />
        </div>
      )}
    </div>
  );
}

export default Board;
