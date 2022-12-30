import React from "react";
import { useFormikContext } from "formik";
import { CONSTS } from "@/consts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ProductStatus = () => {
  const { values, handleChange } = useFormikContext();
  return (
    <div>
      <label htmlFor="status">
        <span className="label-text">Product Status</span>
      </label>
      <Select
        id="status"
        name="product_status"
        value={values.product_status}
        onChange={handleChange}
        size="small"
        fullWidth
        required
      >
        <MenuItem value={CONSTS.PRODUCT_STATUS.IS_IN_STOCK}>In stock</MenuItem>
        <MenuItem value={CONSTS.PRODUCT_STATUS.OUT_OF_STOCK}>
          Out of stock
        </MenuItem>
      </Select>
    </div>
  );
};

export default ProductStatus;
