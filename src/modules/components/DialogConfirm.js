import React from "react";
import Dialog from "@mui/material/Dialog";

const DialogConfirm = ({
  openDialogConfirm,
  setOpenDialogConfirm,
  handleConfirm,
  content,
}) => {
  return (
    <Dialog open={openDialogConfirm}>
      <div className="m-4 ">
        <div className="d-flex justify-content-center aligns-center mb-5">
          <p>{content}</p>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => setOpenDialogConfirm(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => handleConfirm()}>
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogConfirm;
