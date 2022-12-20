import { Backdrop } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./splashscreen.scss";

function SplashScreen() {
  return (
    <Backdrop open={true}>
      <CircularProgress/>
    </Backdrop>
  );
}

export default SplashScreen;
