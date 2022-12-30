import React from "react";
import { useFormikContext } from "formik";

const ProductName = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <div>
      <label htmlFor="name">
        <span className="label-text">Product Name</span>
      </label>
      <input
        type="text"
        id="name"
        name="product_name"
        className="form-control"
        value={values?.product_name}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default ProductName;
