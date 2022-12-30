import React from 'react'
import { useFormikContext } from "formik";

const ProductPrice = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <div>
      <label htmlFor="price">
        <span className="label-text">Product Price (Vnd)</span>
      </label>
      <input
        type="number"
        id="price"
        name="product_price"
        className="form-control"
        value={values?.product_price}
        onChange={handleChange}
        min="0"
        required
      />
    </div>
  );
}

export default ProductPrice