import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import axiosInstance from "@/api/axiosInstance";
import { useState } from "react";
import AppLoader from "@/components/AppLoader";
import { toast } from "react-hot-toast";
import ProductName from "../components/ProductName";
import ProductPrice from "../components/ProductPrice";
import ProductStatus from "../components/ProductStatus";
import ProductType from "../components/ProductType";
import ProductBrandAndCategory from "../components/ProductBrandAndCategory";
import ProductDetail from "../components/ProductDetail";
import ProductImage from "../components/ProductImage";
import ProductDes from "../components/ProductDes";
import { useSelector } from "react-redux";

const EditProduct = () => {
  const {brandList, categoryList} = useSelector((state) => state.products)
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [des, setDes] = useState(" ")
  const [isReinit, setIsReinit] = useState(false)
  const getProductById = async (id) => {
    setLoading(true);
    const res = await axiosInstance.get(`getProductById?id=${id}`);
    if (res) {
      setProductData(res?.data?.result);
      setDes(res?.data?.result?.product_des)
    } else {
      toast.error("Get product failed", {
        duration: 2000,
        position: "bottom-right",
      });
    }
    setIsReinit(true)
    setLoading(false);
  };

  const updateProduct = async (data) => {
    setLoading(true);
    const res = await axiosInstance.post("updateProduct", data);
    if (res) {
      toast.success("Update product success", {
        duration: 2000,
        position: "bottom-right",
      });
      navigate("/products");
    } else {
      toast.error("Update product fail", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };
  const cancelCreateProduct = () => {
    navigate("/products");
  };

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDes(des)
    // setDes(productData.product_des)
    // eslint-disable-next-line
  }, [isReinit, loading])

  return (
    <div className="content-layout position-relative">
      <Formik
        initialValues={{
          product_id: id,
          product_name: productData?.product_name ? productData?.product_name : "",
          product_price: productData?.product_price ? productData?.product_price : "",
          product_status: productData?.product_status ? productData?.product_status : "" ,
          product_brand: productData?.product_brand ? productData?.product_brand : "",
          product_category: productData?.product_category ? productData?.product_category : "",
          product_des: productData?.product_des ? productData?.product_des : "",
          product_image: productData?.product_image ? productData?.product_image : "",
          product_type: productData?.product_type ? productData?.product_type : "",
          product_detail: productData?.product_detail
            ? productData?.product_detail
            : [],
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          if (values.product_des) {
            updateProduct(values);
          } else {
            toast.error("Product Description required", {
              duration: 3000,
              position: "bottom-center",
            });
          }
        }}
      >
        <Form>
          <div className="row form-group required">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="mb-4">
                <ProductImage />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="row mb-4">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <ProductName />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <ProductPrice />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <ProductStatus />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <ProductType />
                </div>
              </div>
              <div className="mb-4">
                <ProductBrandAndCategory categoryList={categoryList} brandList={brandList} />
              </div>
              <div className="mb-4">
                <ProductDetail />
              </div>
              <div className="mb-4">
                <ProductDes des={des} isReinit={isReinit}/>
              </div>
            </div>
          </div>
          <div
            className="footer position-fixed"
            style={{ left: "200px", zIndex: "100", backgroundColor: "#fff" }}
          >
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-light mx-4"
                onClick={cancelCreateProduct}
              >
                Cancel
              </button>
              <button className="btn btn-primary mx-4" type="submit">
                Save Product
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <AppLoader isOpen={loading} />
    </div>
  );
};

export default EditProduct;
