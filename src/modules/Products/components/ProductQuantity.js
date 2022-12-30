import React, { useState } from "react";
import { useFormikContext } from "formik";

const ProductQuantity = () => {
  const { values } = useFormikContext();
  const [quantity, setQuantity] = useState();
  const handleChangeQuantity = (e) => {
    const value = e.target.value
    setQuantity(value)
    values.product_detail = [
      {product_quantity: Number(value)}
    ]
  };
  return (
    <div>
      <div className="col-md-6 col-lg-6">
        <label htmlFor="quantity">
          <span className="label-text">Product Quantity</span>
        </label>
        <input
          type="number"
          id="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChangeQuantity}
          min="1"
          required
        />
      </div>
    </div>
  );
};

export default ProductQuantity;
