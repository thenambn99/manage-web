import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import ModalOrderDetail from "../components/ModalOrderDetail";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [orderId, setOrderId] = useState({})
  const statusList = [
    {
      status_name: "Pending",
      value: 1,
    },
    {
      status_name: "Approved",
      value: 2,
    },
    {
      status_name: "Delivering",
      value: 3,
    },
    {
      status_name: "Delivered",
      value: 4,
    },
    {
      status_name: "Cancelled",
      value: 5,
    },
  ];
  const getAllOrders = async () => {
    setLoading(true);
    const res = await axiosInstance.get("getAllOrders");
    if (res.data.success) {
      setOrderList(res.data.result);
    } else {
      toast.error("Get order list failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModalOrderDetail = (id) => {
    setOrderId(id)
    setOpenModal(true)
  }

  const handleChangeStatus = async (status, id) => {
    setLoading(true);
    const res = await axiosInstance.post("changeOrderStatus", {
      id: id,
      order_status: status,
    });
    if (res.data.success) {
      toast.success("Change status success", {
        position: "bottom-right",
        duration: 2000,
      });
      getAllOrders();
      setLoading(false);
    } else {
      toast.error("Change status failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const deleteOrder = async (id) => {
    setLoading(true)
    const res = await axiosInstance.post("deleteOrder", {id: id})
    if (res.data.success) {
      toast.success("Delete order success", {
        position: "bottom-right",
        duration: 2000
      })
      getAllOrders()
    } else {
      toast.error("Delete order failed", {
        position: "bottom-right",
        duration: 2000
      })
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  const handleSelectStatus = (value, id) => {
    handleChangeStatus(value, id);
  };

  const handleDeleteOrder = (id) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        deleteOrder(id)
      }
    });
  }

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="with-navbar"></div>
      <div className="content-layout">
        <div className="row mb-4 justify-content-between">
          <div className="col-sm-4 col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by code"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
        <table className="table table-hover align-middle table-sm">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Address</th>
              <th>Order Code</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderList
              .filter((o) => o.order_code.includes(search))
              .map((o) => (
                <tr key={o.id} style={{ height: "50px" }}>
                  <td>{o.user_name}</td>
                  <td>{o.user_address}</td>
                  <td>{o.order_code}</td>
                  <td>{dayjs(`${o.order_date}`).format("DD-MM-YYYY")}</td>
                  <td>
                    {o.total_price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    <div>
                      <Select
                        onChange={(e) =>
                          handleSelectStatus(e.target.value, o.id)
                        }
                        size="small"
                        fullWidth
                        value={o.order_status}
                        disabled={o.order_status === 5 || o.order_status === 4}
                      >
                        {statusList.map((s, i) => (
                          <MenuItem key={i} value={s.value}>
                            {s.status_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-row-reverse">
                      <div className="px-2">
                        {o.order_status === 5 ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteOrder(o.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        ) : (
                          <button type="button" className="btn btn-primary" onClick={() => handleOpenModalOrderDetail(o.id)}>
                            <i className="bi bi-eye"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModalOrderDetail openModal={openModal} handleCloseModal={handleCloseModal} orderId={orderId} />
      <AppLoader isOpen={loading} />
    </div>
  );
};

export default Orders;
