import React from "react";
import { useFormikContext } from "formik";
import { CONSTS } from "@/consts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const ProductDetail = () => {
  const { idProduct } = useParams();
  const { values } = useFormikContext();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [detailData, setDetailData] = useState([]);
  const [disable, setDisable] = useState(true)

  const handleChangeSize = (e) => {
    const value = e.target.value;
    setSize(value);
    setDisable(false)
    const detail = detailData.find((data) => data.product_size === value);
    if (detail) {
      detail.product_quantity
        ? setQuantity(detail.product_quantity)
        : setQuantity(0);
    } else {
      detailData.push({
        product_size: value,
        ...(idProduct ? { product_id: idProduct } : {}),
      });
      setQuantity(0);
    }
    values.product_detail = detailData;
  };

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
    const index = detailData.findIndex((data) => data.product_size === size);
    detailData[index].product_quantity = Number(value);
    values.product_detail = detailData;
  };


  useEffect(() => {
    if (values.product_detail) {
      setDetailData(values.product_detail);
    }
    // eslint-disable-next-line
  }, [values.product_detail]);

  return (
    <div className="row">
      <div className="col-md-6 col-lg-6">
        <label htmlFor="status">
          <span className="label-text">Product Size</span>
        </label>
        <Select
          id="status"
          value={size}
          onChange={handleChangeSize}
          size="small"
          fullWidth
          required
        >
          {CONSTS.PRODUCT_SIZE.map((size) => (
            <MenuItem key={size.value} value={size.value}>
              {size.name}
            </MenuItem>
          ))}
        </Select>
      </div>
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
          disabled={disable}
          required
        />
      </div>
    </div>
  );
};

export default ProductDetail;
