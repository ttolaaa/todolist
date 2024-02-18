import React, { useEffect, useState, useRef } from "react";
import styles from "./TodoDropdownFilter.module.css";

import { GoChevronDown } from "react-icons/go";

interface TodoDropdownFilterProps {
  statusFilter: string;
  onDropdownItemClick: Function;
}

const TodoDropdownFilter: React.FC<TodoDropdownFilterProps> = (props) => {
  const { statusFilter, onDropdownItemClick } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilterButtonClick = async (filter: string) => {
    setShowDropdown(false);
    onDropdownItemClick(filter);
  };

  return (
    <div className={styles.todo_container}>
      <p className={styles.todo_text}>To-dos</p>
      <div className={styles.todo_dropdown}>

        <button className={styles.dropbtn} onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef}>
          <span className={styles.dropdown_text}>{statusFilter === "Undone" ? "To Do" : statusFilter}</span>
          <GoChevronDown className={`${styles.dropdown_icon} ${showDropdown ? styles.dropdown_icon_open : ""}`} />
          {showDropdown && (<div className={styles.dropdown_content} id="myDropdown">
            <a href="#" onClick={() => handleFilterButtonClick("All")}>All</a>
            <a href="#" onClick={() => handleFilterButtonClick("Undone")}>Undone</a>
            <a href="#" onClick={() => handleFilterButtonClick("Done")}>Done</a>
          </div>)}
        </button>

      </div>
    </div>
  );
};

export default TodoDropdownFilter;

