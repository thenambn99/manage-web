import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import ModalUpdateUser from "../components/ModalUpdateUser";
import { toast } from "react-hot-toast";
import DialogConfirm from "@/modules/components/DialogConfirm";
import { useRef } from "react";

const Users = () => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [modalTitle, setModalTilte] = useState("");
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [contentDialog, setContentDiaglog] = useState("");
  const roleName = {
    1: "User",
    2: "Staff",
    3: "Admin",
  };
  const idUser = useRef();
  const getAllUsers = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/getAllUsers");
    if (res) {
      setUserList(res.data.result);
    }
    setLoading(false);
  };

  const updateUser = async (data) => {
    setLoading(true);
    const res = await axiosInstance.post("/updateUser", data);
    if (res) {
      await getAllUsers();
      toast.success("Update user successed", {
        position: "bottom-right",
        duration: 2000,
      });
    } else {
      toast.error("Update user failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const registerUser = async (data) => {
    setLoading(true);
    const res = await axiosInstance.post("/register", data);
    if (res) {
      await getAllUsers();
      toast.success("Register user successed", {
        position: "bottom-right",
        duration: 2000,
      });
    } else {
      toast.error("Resgister user failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/deleteUser", { id: id });
      if (res) {
        await getAllUsers();
        toast.success("Delete user successed", {
          position: "bottom-right",
          duration: 2000,
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toast.error("Delete user failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateUser = (user, title) => {
    setModalTilte(title);
    setUserInfo(user);
    setOpenModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  const handleDeleteUser = (id) => {
    setContentDiaglog("Are you sure want to delete this User");
    setOpenDialogConfirm(true);
    idUser.current = id;
  };

  const handleConfirm = async () => {
    await deleteUser(idUser.current);
    setOpenDialogConfirm(false);
  };

  return (
    <div>
      <div className="row mb-4 justify-content-between">
        <div className="col-sm-4 col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="col-sm-4 col-md-4">
          <div className="float-end">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleUpdateUser(null, "add")}
            >
              + Add New User
            </button>
          </div>
        </div>
      </div>

      <table className="table table-hover align-middle table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList
            .filter((user) => user.name.includes(search.toLowerCase().trim()))
            .sort((a, b) => b.role - a.role)
            .map((user) => (
              <tr key={user.id} style={{ height: "50px" }}>
                <td>{user.name}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>{roleName[user.role]}</td>
                <td>
                  {user.role !== 3 ? (
                    <div className="d-flex float-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleUpdateUser(user, "edit")}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <div className="px-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <AppLoader isOpen={loading} />
      {openModal ? (
        <ModalUpdateUser
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          userInfo={userInfo}
          title={modalTitle}
          updateUser={updateUser}
          registerUser={registerUser}
        />
      ) : null}
      {openDialogConfirm ? (
        <DialogConfirm
          openDialogConfirm={openDialogConfirm}
          setOpenDialogConfirm={setOpenDialogConfirm}
          handleConfirm={handleConfirm}
          content={contentDialog}
        />
      ) : null}
    </div>
  );
};

export default Users;
