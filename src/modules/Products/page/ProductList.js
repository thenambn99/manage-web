import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import usePagination from "@/utils/Pagination";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getBrandList, getCategoryList } from "../redux/productActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRef } from "react";

const ProductList = () => {
  const dispatch = useDispatch();
  const { brandList, categoryList } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [filterBrandList, setFilterBrandList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [productListClone, setProductListClone] = useState([]);
  const [searchBrandValue, setSearchBrandValue] = useState("nl");
  const idCategory = useRef();
  const PER_PAGE = 5;
  const count = Math.ceil(productListClone.length / PER_PAGE);
  const _DATA = usePagination(productListClone, PER_PAGE);
  const navigate = useNavigate();
  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const getProductList = async () => {
    setLoading(true);
    const res = await axiosInstance.get("getProductList");
    if (res) {
      setProductList(res.data.result);
      setProductListClone(res.data.result);
    } else {
      toast.error("Get product list failed", {
        duration: 2000,
        position: "bottom-right",
      });
    }
    setLoading(false);
  };

  const readImg = (imgBuffer) => {
    return new Buffer(imgBuffer, "base64").toString("binary");
  };

  const handleEditProduct = (id) => {
    navigate(`edit/${id}`);
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    const res = await axiosInstance.post("deleteProduct", { id: id });
    if (res) {
      toast.success("Delete product success", {
        duration: 2000,
        position: "bottom-right",
      });
      getProductList();
    } else {
      toast.error("Delete product failed", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const handleDeleteProduct = (id) => {
    swal({
      title: "Are you sure want to delete?",
      // text: "Are you sure want to delete this?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        deleteProduct(id);
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setProductListClone(
        productList.filter(
          (p) =>
            removeAccents(p.product_name).includes(e.target.value) ||
            p.product_name.includes(e.target.value)
        )
      );
    }
  };

  const handleSearchByCategory = (id) => {
    if (id) {
      setProductListClone(
        productList.filter((p) => p.product_category === Number(id))
      );
      idCategory.current = Number(id);
      setFilterBrandList(brandList.filter((b) => b.category_id === Number(id)));
      setIsDisabled(false);
    } else {
      setProductListClone(productList);
      setSearchBrandValue("nl");
      setIsDisabled(true);
    }
  };

  const handleSearchByBrand = (id) => {
    if (id) {
      setProductListClone(
        productList.filter(
          (p) =>
            p.product_brand === Number(id) &&
            p.product_category === idCategory.current
        )
      );
      setSearchBrandValue(id);
    } else {
      setProductListClone(productList);
    }
  };

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
    getProductList();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="with-navbar">
        <div className="float-end h-100 mx-5">
          <div className="d-flex align-items-center h-100">
            <Link to="new" className="link">
              New Product
            </Link>
          </div>
        </div>
      </div>
      <div className="content-layout">
        <div className="row mb-4">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>
              <span className="label-text">Name</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>
              <span className="label-text">Category</span>
            </label>
            <Select
              onChange={(e) => handleSearchByCategory(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="">Not select</MenuItem>
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>
              <span className="label-text">Brand</span>
            </label>
            <Select
              onChange={(e) => handleSearchByBrand(e.target.value)}
              value={searchBrandValue}
              size="small"
              fullWidth
              disabled={isDisabled}
            >
              <MenuItem value="nl">Not select</MenuItem>
              {filterBrandList.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4 mt-5">
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
        <table className="table table-hover align-middle table-sm mt-4">
          <thead>
            <tr>
              <td style={{ width: "33.333%" }}>Name</td>
              <td>Image</td>
              <td>Price (VND)</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {_DATA.currentData().map((product) => (
              <tr key={product.id}>
                <td style={{ width: "33.333%" }}>{product.product_name}</td>
                <td>
                  <img
                    src={readImg(product.product_image)}
                    alt=""
                    style={{ maxHeight: "100px" }}
                  />
                </td>
                <td>{product.product_price}</td>
                <td>
                  {product.product_status === 1 ? (
                    <>
                      <p className="text-success">In stock</p>
                    </>
                  ) : (
                    <>
                      <p className="text-danger">Out of stock</p>
                    </>
                  )}
                </td>
                <td>
                  <div className="d-flex flex-row-reverse">
                    <div className="px-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AppLoader isOpen={loading} />
    </div>
  );
};

export default ProductList;
