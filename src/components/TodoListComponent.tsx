import React, { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./TodoListComponent.module.css";
import "react-toastify/dist/ReactToastify.css";

import { fetchTodos, createTodo, deleteTodo, toggleTodo } from "../api/api";
import { ToastContainer, Zoom, toast } from "react-toastify";

import BeatLoader from "react-spinners/BeatLoader";
import TodoProgressBar from "../blocks/TodoProgressBar/TodoProgressBar";
import TodoDropdownFilter from "../blocks/TodoDropDownFilter/TodoDropdownFilter";
import TodoInputWithAddButton from "../blocks/TodoInputWithAddButton/TodoInputWithAddButton";
import TodoListing from "../blocks/TodoListing/TodoListing";
import ConfirmationDialog from "../blocks/ConfirmationDialog/ConfirmationDialog";

interface TodoProps {
  _id: string;
  text: string;
  isDone: boolean;
  createdAt: number;
}

const toastOption: object = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  theme: "light",
  transition: Zoom,
}

const TodoListComponent: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [todoInputText, setTodoInputText] = useState<string>("");
  const [doneTodosLength, setDoneTodoLength] = useState<number>(0);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error: any) {
        showErrorToast(error.message || "Error fetching the tasks.");
      }
      setShowLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDoneTodoLength(todos.filter(todo => todo.isDone).length);
  }, [todos])

  useEffect(() => {
    if (showLoading || showDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoading, showDialog])

  const showSuccessToast = (msg: string) => {
    toast.success(msg, toastOption);
  }
  const showErrorToast = (msg: string) => {
    toast.error(msg, toastOption);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoInputText(event.target.value);
  };

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoading(true);
    try {
      await createTodo(todoInputText);
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
      setTodoInputText("");
      showSuccessToast("The task is added!");
    } catch (error: any) {
      showErrorToast(error.message || "Error creating the task.");
    }
    setShowLoading(false);
  };


  const handleCheckboxChange = async (todoId: string, isDone: boolean) => {
    setShowLoading(true);
    try {
      await toggleTodo(todoId);
      const updatedTodos = todos.map(todo =>
        todo._id === todoId ? { ...todo, isDone: !isDone } : todo
      );
      setTodos(updatedTodos);
      showSuccessToast(`Task has been ${isDone ? "un" : ""}checked`)
    } catch (error: any) {
      showErrorToast(error.message || "Failed to toggle todo.");
    }
    setShowLoading(false);
  };

  const handleToggleDeleteButton = (todoId: any) => {
    setItemIdToDelete(prevTodoId => !prevTodoId ? todoId : null);
  };

  const handleDeleteTodoBtnClick = async (todoId: string) => {
    setShowDialog(true);
    setItemIdToDelete(todoId);
  };

  const handleCancelDialog = () => {
    setShowDialog(false);
  }

  const handleConfirmDialog = async (todoId: any) => {
    setShowDialog(false);
    setShowLoading(true);
    try {
      await deleteTodo(todoId);
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
      showSuccessToast("TODO is deleted!");
    } catch (error: any) {
      showErrorToast(error.message || "Failed to delete task.");
    }
    setShowLoading(false)
    setShowDialog(false)

  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <TodoProgressBar
          doneTodosLength={doneTodosLength}
          todosLength={todos?.length}
        />
        <TodoDropdownFilter
          statusFilter={statusFilter}
          onDropdownItemClick={(filter: string) => setStatusFilter(filter)}
        />
        <TodoInputWithAddButton
          todoInputText={todoInputText}
          handleInputChange={handleInputChange}
          handleSubmit={handleAddTodo}
        />
        <TodoListing
          todos={todos}
          statusFilter={statusFilter}
          itemIdToDelete={itemIdToDelete}
          setItemIdToDelete={setItemIdToDelete}
          handleCheckboxChange={handleCheckboxChange}
          handleToggleDeleteButton={handleToggleDeleteButton}
          handleDeleteTodoBtnClick={handleDeleteTodoBtnClick}
        />
      </div>

      <ToastContainer />
      {!!showLoading && (
        <div className={styles.loading_container}>
          <BeatLoader
            color={"#526f92"}
            loading={true}
            size={20}
            aria-label="Loading Spinner"
          />
        </div>
      )}
      {!!showDialog && (
        <ConfirmationDialog
          itemIdToDelete={itemIdToDelete}
          handleCancelDialog={handleCancelDialog}
          handleConfirmDialog={handleConfirmDialog}
        />
      )}
    </div>
  );
};

export type { TodoProps };

export default TodoListComponent;

