import React from "react";
import { useFormikContext } from "formik";
import { CONSTS } from "@/consts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ProductType = () => {
  const { values, handleChange } = useFormikContext();
  return (
    <div>
      <label htmlFor="type">
        <span className="label-text">Product Type</span>
      </label>
      <Select
        id="type"
        name="product_type"
        value={values.product_type}
        onChange={handleChange}
        size="small"
        fullWidth
        required
      >
        <MenuItem value={CONSTS.PRODUCT_TYPE.CLOTHES}>Clothes</MenuItem>
        <MenuItem value={CONSTS.PRODUCT_TYPE.OTHERS}>Others</MenuItem>
      </Select>
    </div>
  );
};

export default ProductType;
