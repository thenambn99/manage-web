import axiosInstance from "@/api/axiosInstance";
import AppLoader from "@/components/AppLoader";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const chageData = (data) => {};
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <hr />
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((data) => (
                <tr key={data.id}>
                  <td>
                    <div>
                      <input type="text" value={data.category_name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6 col-sm-6">
          <table className="table">
            <thead>
              <tr>
                <th>Brand Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer d-flex justify-content-end">
        <button className="btn btn-primary px-4 mx-5 m-3" disabled={true}>
          SAVE
        </button>
      </div>
      <AppLoader isOpen={loading} />
    </div>
  );
};

export default Categories;
