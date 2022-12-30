import React, { useState } from "react";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { toBase64 } from "@/utils/ToBase64";
import { Buffer } from "buffer";
const ProductImage = () => {
  const { values } = useFormikContext();
  const [newImage, setNewImage] = useState();
  useEffect(() => {
    if (values.product_image && values.product_image.type === "Buffer") {
      const img = readImg(values.product_image)
      setNewImage(img);
      values.product_image = img
    }
    // eslint-disable-next-line 
  }, [values.product_image]);
  const uploadImage = async (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    const base64 = await toBase64(e.target.files[0]);
    values.product_image = base64;

  };
  const readImg = (imgBuffer) => {
    return new Buffer(imgBuffer, "base64").toString("binary");
  };
  return (
    <div>
      <label htmlFor="image">
        <span className="label-text">Product Image</span>
      </label>
      <input
        type="file"
        className="form-control"
        id="image"
        onChange={uploadImage}
        // required
      />
      <div className="d-flex justify-content-center mt-4">
        {newImage ? <img src={newImage} alt="Product" /> : null}
      </div>
    </div>
  );
};

export default ProductImage;
