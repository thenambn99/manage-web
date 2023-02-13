import React, { useEffect, useState } from "react";
import ModalStyled from "@/modules/components/ModalStyled";
import axiosInstance from "@/api/axiosInstance";
import { Buffer } from "buffer";
import { toast } from "react-hot-toast";
import { CONSTS } from "@/consts";

const ModalOrderDetail = ({ orderId, handleCloseModal, openModal }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const readImg = (imgBuffer) => {
    return new Buffer(imgBuffer, "base64").toString("binary");
  };
  const getOrderDetail = async (orderId) => {
    const res = await axiosInstance.post("getOrderDetail", { id: orderId });
    if (res.data.success) {
      setOrderDetail(res.data.result);
    } else {
      toast.error("Get order detail failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    if (openModal) {
      getOrderDetail(orderId);
    }
    // eslint-disable-next-line
  }, [openModal]);

  return (
    <ModalStyled openModal={openModal} handleCloseModal={handleCloseModal}>
      <div>
        <p>Order Detail</p>
      </div>
      <table className="table table-hover align-middle table-sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Size</th>
            <th>Product Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.map((o) => (
            <tr key={o.id}>
              <td>{o.product_name}</td>
              <td>
                {
                  <img
                    src={readImg(o.product_image)}
                    alt="Product"
                    style={{ maxWidth: "100px", maxHeight: "120px" }}
                  />
                }
              </td>
              <td>
                {o.product_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{CONSTS.PRODUCT_SIZE[o.product_size - 1].name}</td>
              <td>{o.product_quantity}</td>
              <td>
                {(o.product_quantity * o.product_price).toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-row-reverse mt-4">
        <button className="btn btn-light" onClick={() => handleCloseModal()}>
          <span>Cancel</span>
        </button>
      </div>
    </ModalStyled>
  );
};

export default ModalOrderDetail;
