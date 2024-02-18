import React, { FormEventHandler, ChangeEventHandler } from "react";
import styles from "./TodoInputWithAddButton.module.css";

interface TodoInputWithAddButtonProps {
  todoInputText: string;
  handleInputChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}

const TodoInputWithAddButton: React.FC<TodoInputWithAddButtonProps> = (props) => {
  const { todoInputText, handleInputChange, handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.input_form}>
        <input type="text" value={todoInputText} onChange={handleInputChange} className={styles.todo_input} name="text" placeholder="Add your to-do …" />
        <button type="submit" className={styles.add_button}>Add</button>
      </form>
    </div>
  );
};

export default TodoInputWithAddButton;

