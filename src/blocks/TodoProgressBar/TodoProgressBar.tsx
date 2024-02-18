import React from "react";
import styles from "./TodoProgressBar.module.css";

interface TodoProgressBarProps {
  doneTodosLength: number;
  todosLength: number;
}
const TodoProgressBar: React.FC<TodoProgressBarProps> = (props) => {
  const { doneTodosLength, todosLength } = props;
  return (
    <div className={styles.progress_container}>
      <h2 className={styles.progress_text}>Progress</h2>
      <div className={styles.progress_bar_track}>
        <div className={styles.progress_bar} style={{ width: `${doneTodosLength / todosLength * 100}%` }} />
      </div>
      <p className={styles.progress_completed_text}>{doneTodosLength} completed</p>
    </div>
  );
};

export default TodoProgressBar;

