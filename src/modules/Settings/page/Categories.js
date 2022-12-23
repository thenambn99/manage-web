import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import ModalUpdateBrandAndCategory from "../components/ModalUpdateBrandAndCategory";
import swal from "sweetalert";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const action = useRef();
  const categoryId = useRef();
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (name, id, type, Action) => {
    const data = {
      name: name,
      id: id,
    };
    action.current = {
      type: type,
      action: Action,
    };
    setOpenModal(true);
    setData(data);
  };

  const handleConfirm = (name) => {
    if (action.current.type === "update") {
      updateBrandOrCategory(
        data.id,
        name,
        action.current.action,
        action.current.type
      );
    }
    if (action.current.type === "create") {
      let value;
      if (action.current.action === "createBrand") {
        value = {
          category_id: categoryId.current,
          brand_name: name,
        };
      }
      if (action.current.action === "createCategory") {
        value = {
          category_name: name,
        };
      }
      createBrandOrCategory(value, action.current.action, action.current.type);
    }
    setOpenModal(false);
  };

  const getAllCategories = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/getAllCategories");
    if (res) {
      setCategoryList(res.data.result);
      setLoading(false);
    } else {
      toast.error("Get all categories failed", {
        position: "bottom-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const getBrandList = async (id) => {
    setLoading(true);
    const res = await axiosInstance.post("/getBrandsById", { id: id });
    if (res) {
      setBrandList(res.data.result);
      setLoading(false);
    } else {
      toast.error("Get brands failed", {
        position: "bottom-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const updateBrandOrCategory = async (id, value, action, type) => {
    setLoading(true);
    const res = await axiosInstance.post(`${action}`, {
      id: id,
      value: value,
    });
    if (res) {
      action === "updateCategory"
        ? getAllCategories()
        : getBrandList(categoryId.current);
      setLoading(false);
    } else {
      toast.error("Update failed", {
        position: "bottom-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const createBrandOrCategory = async (value, action, type) => {
    setLoading(true);
    const res = await axiosInstance.post(`${action}`, value);
    if (res) {
      action === "createCategory"
        ? getAllCategories()
        : getBrandList(categoryId.current);
      setLoading(false);
    } else {
      toast.error("Create failed", {
        position: "bottom-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const deleteBrandOrCategory = async (id, action) => {
    setLoading(true);
    const res = await axiosInstance.post(action, { id: id });
    if (res) {
      action === "deleteCategory"
        ? getAllCategories()
        : getBrandList(categoryId.current);
    } else {
      toast.error("Delete failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };

  const handleDeleteBrandOrCategory = (id, action) => {
    swal({
      title: "Are you sure want to delete?",
      // text: "Are you sure want to delete this?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        deleteBrandOrCategory(id, action)
      }
    });
  };

  const handleChangeCategory = (e) => {
    const id = Number(e.target.value);
    categoryId.current = id;
    if (id) {
      return getBrandList(id);
    }
    setBrandList([]);
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <hr />
      <div className="row d-flex">
        <div
          className="col-md-6 col-sm-6 position-relative"
          style={{ maxHeight: "460px" }}
        >
          <div style={{ maxHeight: "390px", overflow: "auto" }}>
            <table className="table table-hover align-middle">
              <thead>
                <tr style={{ height: "60px" }}>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.category_name}</td>
                    <td>
                      <div className="d-flex flex-row-reverse">
                        <div className="px-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              handleDeleteBrandOrCategory(
                                data.id,
                                "deleteCategory"
                              )
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleOpenModal(
                              data.category_name,
                              data.id,
                              "update",
                              "updateCategory"
                            )
                          }
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
          <div className="footer position-absolute d-flex align-items-center">
            <button className="btn btn-light">
              <span
                className="text-primary"
                onClick={() =>
                  handleOpenModal("", null, "create", "createCategory")
                }
              >
                + Category
              </span>
            </button>
          </div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ height: "460px", width: "50px" }}
        >
          <div className="vr"></div>
        </div>
        <div
          className="col-md-5 col-sm-5 position-relative"
          style={{ maxHeight: "460px" }}
        >
          <div style={{ maxHeight: "390px", overflow: "auto" }}>
            <table className="table table-hover align-middle">
              <thead>
                <tr style={{ height: "60px" }}>
                  <th>Brand</th>
                  <th style={{ width: "240px" }}>
                    <select
                      className="form-select"
                      onChange={(e) => handleChangeCategory(e)}
                    >
                      <option value="">Please select</option>
                      {categoryList.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                {brandList.map((brand) => (
                  <tr key={brand.id}>
                    <td>{brand.brand_name}</td>
                    <td>
                      <div className="d-flex flex-row-reverse">
                        <div className="px-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              handleDeleteBrandOrCategory(
                                brand.id,
                                "deleteBrand"
                              )
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleOpenModal(
                              brand.brand_name,
                              brand.id,
                              "update",
                              "updateBrand"
                            )
                          }
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
          <div className="footer position-absolute d-flex align-items-center">
            <button
              className="btn btn-light"
              onClick={() => handleOpenModal("", null, "create", "createBrand")}
              disabled={!categoryId.current}
            >
              <span className="text-primary">+ Brand</span>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <AppLoader isOpen={loading} />
      {openModal ? (
        <ModalUpdateBrandAndCategory
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          handleConfirm={handleConfirm}
          name={data?.name}
        />
      ) : null}
    </div>
  );
};

export default Categories;
