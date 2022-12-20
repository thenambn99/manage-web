import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #cccccc",
  boxShadow: 24,
  p: 4,
};

const ModalStyled = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgb(80 80 80 / 50%);
    margin-top: 48px !important;
    margin-left: 200px !important;
  }
`;

const ModalUpdateUser = ({
  openModal,
  handleCloseModal,
  userInfo,
  title,
  updateUser,
  registerUser,
}) => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);
  const formik = useFormik({
    initialValues: {
      id: userInfo?.id,
      name: userInfo?.name,
      email: userInfo?.email,
      phone_number: userInfo?.phone_number,
      address: userInfo?.address,
      role: userInfo?.role ? userInfo?.role : 1,
      password: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        role: Number(values.role),
      };
      handleCloseModal();
      if (title === "add") {
        return registerUser(data);
      }
      delete values.password;
      updateUser(data);
    },
  });

  return (
    <ModalStyled
      sx={{}}
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={style}>
          <div>
            <p>{title === "add" ? "Add User" : "Edit User"}</p>
          </div>
          <div className="row form-group required">
            <div className="col-sm-6 col-md-6">
              <label htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <div className="input-group">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <div className="input-group">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  className="form-control"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row form-group required">
            <div className="col-sm-6 col-md-6">
              <label htmlFor="address">
                <span className="label-text">Address</span>
              </label>
              <div className="input-group">
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-control"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <label htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <div className="input-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row form-group required">
            <div className="col-sm-6 col-md-6">
              <label htmlFor="role">
                <span className="label-text">Role</span>
              </label>
              <div className="input-group">
                <select
                  id="role"
                  name="role"
                  type="text"
                  className="form-select"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  required
                >
                  <option value="1">User</option>
                  <option value="2">Staff</option>
                  <option value="3">Admin</option>
                </select>
              </div>
            </div>
            {title === "add" ? (
              <div className="col-sm-6 col-md-6">
                <label htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="d-flex mt-4 justify-content-between">
            <button type="button" className="btn btn-secondary"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
          </div>
        </Box>
      </form>
    </ModalStyled>
  );
};

export default ModalUpdateUser;
