import React from "react";
import styles from "./ConfirmationDialog.module.css";

import { CgClose } from "react-icons/cg";
import { PiWarningCircleBold } from "react-icons/pi";

interface ConfirmationDialogProps {
  itemIdToDelete: string | null;
  handleCancelDialog: () => void;
  handleConfirmDialog: Function;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { handleCancelDialog, handleConfirmDialog, itemIdToDelete } = props;
  return (
    <div className={styles.dialog_container}>
      <div className={styles.dialog_wrapper}>
        <div className={styles.header_wrapper}>
          <span>Delete Confirmation</span>
          <CgClose onClick={handleCancelDialog} />
        </div>
        <div className={styles.text_wrapper}>
          <PiWarningCircleBold className={styles.dialog_text_icon} />
          <span>Do you want to delete this task? </span>
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={handleCancelDialog} className={styles.cancel_button}>No</button>
          <button onClick={() => handleConfirmDialog(itemIdToDelete)} className={styles.confirm_button}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

