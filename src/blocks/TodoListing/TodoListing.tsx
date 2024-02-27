import React, { useState, useEffect, useRef } from "react";
import styles from "./TodoListing.module.css";

import { LuMoreHorizontal, LuCheck } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { TodoProps } from "../../components/TodoListComponent";

interface TodoListingProps {
  todos: Array<TodoProps>;
  statusFilter: string;
  itemIdToDelete: string | null;
  setItemIdToDelete: Function;
  handleCheckboxChange: Function;
  handleToggleDeleteButton: Function;
  handleDeleteTodoBtnClick: Function;
  handleEditTodoSubmit: Function;
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
    handleEditTodoSubmit,
  } = props;

  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [editID, setEditID] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");


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

  const handleEditClick = (todoId: string, todoText: string) => {
    setEditID(todoId);
    setEditedText(todoText);
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleSubmitEdit = async () => {
    await handleEditTodoSubmit(editID, editedText);
    setEditID(null);
    setEditedText("");
  }

  const handleEditInputOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // detect enter key to allow submit as well
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSubmitEdit();
    }
  };

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

            {editID === todo._id ? (
              <input
                autoFocus={true}
                type="text"
                value={editedText}
                className={styles.edit_input}
                onChange={handleEditInputChange}
                onBlur={handleSubmitEdit}
                onKeyDown={handleEditInputOnKeyDown}
              />
            ) : (
              <span className={`${styles.todo_texts} ${todo.isDone ? styles.todo_texts_strike : ""}`}>
                {todo.text}
              </span>
            )}

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
            <FaRegEdit
              size={24}
              color="#9796A9"
              className={styles.edit_button}
              onClick={() => handleEditClick(todo._id, todo.text)}
            />
          </div>
        )
      })}
    </div>
  );
};

export default TodoListing;

