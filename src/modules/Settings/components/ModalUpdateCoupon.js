import ModalStyled from "@/modules/components/ModalStyled";
import React from "react";
import { useFormik } from "formik";

const ModalUpdateCoupon = ({
  couponData,
  handleCloseModal,
  handleConfirm,
  openModal,
}) => {
  const formik = useFormik({
    initialValues: {
      coupon_name: couponData?.coupon_name,
      coupon_start: couponData?.coupon_start,
      coupon_end: couponData?.coupon_end,
      coupon_type: couponData?.coupon_type,
      coupon_value: couponData?.coupon_value,
      coupon_code: couponData?.coupon_code,
    },
    onSubmit: (values) => {},
  });
  return (
    <ModalStyled openModal={openModal} handleCloseModal={handleCloseModal}>
      <div>
        <p>Add Coupon</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row form-group required">
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="coupon-name">
              <span className="label-text">Coupon Name</span>
            </label>
            <div className="input-group">
              <input
                id="coupon-name"
                name="coupon-name"
                type="text"
                className="form-control"
                value={formik.values.coupon_name}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="coupon-code">
              <span className="label-text">Coupon Code</span>
            </label>
            <div className="input-group">
              <input
                id="coupon-code"
                name="coupon-code"
                type="text"
                className="form-control"
                value={formik.values.coupon_code}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="coupon-start">
              <span className="label-text">Start time</span>
            </label>
            <div className="input-group">
              <input
                id="coupon-start"
                name="coupon-start"
                type="date"
                className="form-control"
                value={formik.values.coupon_start}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="coupon-end">
              <span className="label-text">End time</span>
            </label>
            <div className="input-group">
              <input
                id="coupon-end"
                name="coupon-end"
                type="date"
                className="form-control"
                value={formik.values.coupon_end}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="Coupon Type">
              <span className="label-text">Coupon Type</span>
            </label>
            <div className="input-group">
              <select
                id="Coupon Type"
                name="Coupon Type"
                type="text"
                className="form-select"
                value={formik.values.coupon_type}
                onChange={formik.handleChange}
                required
              >
                <option value="1">Percent</option>
                <option value="2">Num</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 mt-2">
            <label htmlFor="coupon-value">
              <span className="label-text">Coupon Value</span>
            </label>
            <div className="input-group">
              <input
                id="coupon-value"
                name="coupon-value"
                type="text"
                className="form-control"
                value={formik.values.coupon_value}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </ModalStyled>
  );
};

export default ModalUpdateCoupon;
