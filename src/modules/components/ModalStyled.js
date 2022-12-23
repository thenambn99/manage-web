import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

const IModalStyled = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgb(80 80 80 / 50%);
    margin-top: 48px !important;
    margin-left: 200px !important;
  }
`;

const ModalStyled = ({children, width, openModal, handleCloseModal}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${width}px`,
    bgcolor: "white",
    border: "2px solid #cccccc",
    boxShadow: 24,
    p: 4,
  };
  return (
    <IModalStyled
      sx={{}}
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </IModalStyled>
  );
};

export default ModalStyled;
