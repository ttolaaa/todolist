import React, { useEffect, useRef } from "react";
import styles from "./TodoListing.module.css";

import { LuMoreHorizontal, LuCheck } from "react-icons/lu";
import { TodoProps } from "../../components/TodoListComponent";

interface TodoListingProps {
  todos: Array<TodoProps>;
  statusFilter: string;
  itemIdToDelete: string | null;
  setItemIdToDelete: Function;
  handleCheckboxChange: Function;
  handleToggleDeleteButton: Function;
  handleDeleteTodoBtnClick: Function;
}

const TodoListing: React.FC<TodoListingProps> = (props) => {
  const {
    todos,
    statusFilter,
    itemIdToDelete,
    setItemIdToDelete,
    handleCheckboxChange,
    handleToggleDeleteButton,
    handleDeleteTodoBtnClick,
  } = props;

  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deleteButtonRef.current && !deleteButtonRef.current.contains(event.target as Node)) {
        setItemIdToDelete(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.todo_listing}>
      {todos.map(todo => {
        if (statusFilter == "Done" && !todo.isDone) return;
        if (statusFilter == "Undone" && !!todo.isDone) return;
        return (
          <div className={styles.todo_item} key={todo._id}>
            <div className={styles.checkbox_wrapper}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={todo.isDone}
                onChange={() => handleCheckboxChange(todo._id, todo.isDone)}
              />
              {todo.isDone &&
                <LuCheck
                  color="#FFF"
                  className={styles.checkbox_checked_icon}
                  onClick={() => handleCheckboxChange(todo._id, todo.isDone)}
                />
              }
            </div>

            <span
              className={`${styles.todo_texts} ${todo.isDone ? styles.todo_texts_strike : ""}`}
            >
              {todo.text}
            </span>
            <LuMoreHorizontal
              size={26}
              color="#9796A9"
              className={styles.more_button}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleDeleteButton(todo._id)
              }}
            />
            {itemIdToDelete === todo._id &&
              <button ref={deleteButtonRef} className={styles.delete_button} onClick={() => handleDeleteTodoBtnClick(todo._id)}>Delete</button>
            }
          </div>
        )
      })}
    </div>
  );
};

export default TodoListing;

