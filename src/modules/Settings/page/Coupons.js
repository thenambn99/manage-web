import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import ModalUpdateCoupon from "../components/ModalUpdateCoupon";
import dayjs from "dayjs";
import swal from "sweetalert";

const Coupons = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const handleUpdateCoupon = (coupon) => {
    setCouponData(coupon);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAllCoupons = async () => {
    setLoading(true);
    const res = await axiosInstance.get("getAllCoupons");
    if (res) {
      setCouponList(res.data.result);
      setLoading(false);
    } else {
      toast.error("Get coupon failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const updateCoupon = async (params) => {
    setLoading(true);
    const res = await axiosInstance.post("updateCoupon", params);
    if (res) {
      getAllCoupons();
      toast.success("Update coupon success", {
        position: "bottom-right",
        duration: 2000
      })
    } else {
      toast.error("Update coupon failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const handleConfirm = (data) => {
    const params = {
      ...data,
      coupon_type: Number(data.coupon_type),
      coupon_value: Number(data.coupon_value),
    };
    updateCoupon(params);
    setOpenModal(false);
  };

  const handleDeleteCoupon = async (id) => {
    swal({
      title: "Are you sure want to delete?",
      // text: "Are you sure want to delete this?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        deleteCoupon(id);
      }
    });
  };

  const deleteCoupon = async (id) => {
    setLoading(true);
    const res = await axiosInstance.post("deleteCoupon", { id: id });
    if (res) {
      getAllCoupons();
      toast.success("Delete coupon success", {
        position: "bottom-right",
        duration: 2000
      })
    } else {
      toast.error("Delete coupon failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const handleEditCoupon = (coupon) => {
    setCouponData(coupon)
    setOpenModal(true)
  }
  useEffect(() => {
    getAllCoupons();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>
        <button
          className="btn btn-primary mb-2"
          onClick={() => handleUpdateCoupon(null)}
        >
          + Add new coupon
        </button>
      </div>
      <table className="table table-hover align-middle mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Detail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {couponList.map((coupon) => (
            <tr key={coupon.id} style={{ height: "50px" }}>
              <td>{coupon.coupon_name}</td>
              <td>{coupon.coupon_code}</td>
              <td>{dayjs(`${coupon.coupon_start}`).format("DD-MM-YYYY")}</td>
              <td>{dayjs(`${coupon.coupon_end}`).format("DD-MM-YYYY")} </td>
              <td>
                {dayjs(`${coupon.coupon_end}`).diff(dayjs(), "d") >= 0 ? (
                  <div style={{ color: "green" }}>Available</div>
                ) : (
                  <div style={{ color: "red" }}>Expired</div>
                )}
              </td>
              <td>
                {coupon.coupon_type === 1
                  ? `Sale ${coupon.coupon_value}%`
                  : `Sale ${coupon.coupon_value.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}`}
              </td>
              <td>
                <div className="d-flex flex-row-reverse">
                  <div className="px-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteCoupon(coupon.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditCoupon(coupon)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (
        <ModalUpdateCoupon
          couponData={couponData}
          handleCloseModal={handleCloseModal}
          handleConfirm={handleConfirm}
          openModal={openModal}
        />
      )}
      <AppLoader isOpen={loading} />
    </div>
  );
};

export default Coupons;
