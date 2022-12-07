import React, { useState } from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import { Avatar, Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const Login = () => {
  // const [errorMessages, setErrorMessages] = useState(null);
  const [showError, setShowError] = useState(false);
  const requestLogin = () => {
    // setErrorMessages("Email or password invalid!");
    setShowError(true);
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              requestLogin(values);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                  <span>Email</span>
                  <TextField sx={{ mt: 1, mb: 2 }} size="small" name="email" placeholder="Email"  />
                  <span>Password</span>
                  <TextField sx={{ mt: 1, mb: 2 }} size="small" name="password" type="password" placeholder="Password" />
                </div>
                {showError ? (
                  <Alert severity="error">
                    Email or Password is invalid!
                  </Alert>
                ) : null}
                <div className="d-flex justify-content-center">
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    className="btn-primary mt-3 align-items-center"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
