import React, { useState } from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import { Avatar, Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/authActions";
import { setAccessToken, setAuth } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessages, setErrorMessages] = useState(null);
  const [showError, setShowError] = useState(false);
  const requestLogin = (values) => {
    dispatch(loginThunk(values))
      .then((res) => {
        if (!res?.payload.success) {
          setErrorMessages("Email or password is invalid!");
          setShowError(true);
        } else {
          setAccessToken(res?.payload?.accessToken)
          setAuth(res?.payload?.result)
          navigate("/")
        }
      })
      .catch((e) => {
          setErrorMessages("Server Isn't Responding");
          setShowError(true);
      })
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
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                  <label htmlFor="Email">Email</label>
                  <input
                    // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    className="form-control mb-4 mt-2"
                    id="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control mb-4 mt-2"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {showError ? (
                  <Alert severity="error">{errorMessages}</Alert>
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
