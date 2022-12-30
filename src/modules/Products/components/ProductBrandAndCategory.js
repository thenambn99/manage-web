import React, { useState } from "react";
import { useFormikContext } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";

const ProductBrandAndCategory = ({ categoryList, brandList }) => {
  const { values, handleChange } = useFormikContext();
  const [filterBrandList, setFilterBrandList] = useState([]);
  useEffect(() => {
    setFilterBrandList(brandList.filter((b) => b.category_id === values.product_category));

    // eslint-disable-next-line
  }, [values.product_category, brandList]);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6">
        <label>
          <span className="label-text">Product Category</span>
        </label>
        <Select
          id="category"
          name="product_category"
          value={values.product_category}
          onChange={handleChange}
          size="small"
          fullWidth
          required
        >
          {categoryList.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <label>
          <span className="label-text">Product Brand</span>
        </label>
        <Select
          id="brand"
          name="product_brand"
          value={values.product_brand}
          onChange={handleChange}
          size="small"
          fullWidth
          required
        >
          {filterBrandList.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.brand_name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ProductBrandAndCategory;
