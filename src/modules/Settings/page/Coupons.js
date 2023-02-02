import React, { useState } from "react";
import ModalUpdateCoupon from "../components/ModalUpdateCoupon";

const Coupons = () => {
  const [openModal, setOpenModal] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const handleUpdateCoupon = (coupon) => {
    setCouponData(coupon);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {};
  return (
    <div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => handleUpdateCoupon(null)}
        >
          + Add new coupon
        </button>
      </div>
      {openModal && (
        <ModalUpdateCoupon
          couponData={couponData}
          handleCloseModal={handleCloseModal}
          handleConfirm={handleConfirm}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default Coupons;
