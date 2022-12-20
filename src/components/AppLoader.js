import { Backdrop } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./AppLoader.scss";
import { styled } from "@mui/material/styles";

const BackdropStyled = styled(Backdrop)({
  backgroundColor: "rgb(80 80 80 / 50%)",
  marginTop: "48px",
  marginLeft: "200px",
});

function AppLoader({ isOpen }) {
  return (
    <BackdropStyled open={isOpen}>
      <CircularProgress />
    </BackdropStyled>
  );
}

export default AppLoader;
