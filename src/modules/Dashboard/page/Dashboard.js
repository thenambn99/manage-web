import axiosInstance from "@/api/axiosInstance";
import SplashScreen from "@/components/SplashScreen";
import {
  getAccessToken,
  getAuth,
  removeAccessToken,
  removeAuth,
} from "@/utils/localStorage";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import "./dashboard.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const accessToken = JSON.parse(getAccessToken());
  const auth = JSON.parse(getAuth());
  const getDashboardData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("getDashboardData");
    if (res.data.success) {
      setData(res.data.result);
    } else {
      toast.error("Get data failed", {
        position: "bottom-right",
        duration: 2000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!accessToken || auth.role === 1) {
      removeAccessToken();
      removeAuth();
      navigate("/login");
    }
    getDashboardData();
    // eslint-disable-next-line
  }, []);
  return (
    data && (
      <div>
        <div className="content-layout dashboard">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="d1">
                <p>TOTAL USERS</p>
                <h5>{data.total_users}</h5>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="d1">
                <p>TOTAL ORDERS</p>
                <h5>{data.total_orders}</h5>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="d1">
                <p>COMPLETED ORDERS</p>
                <h5>
                  {Math.round((data.total_completed / data.total_orders) * 100)}
                  %
                </h5>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="d1">
                <p>TOTAL PROFIT</p>
                <h5>
                  {data.total_profit.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-7 col-lg-7 mt-3">
              <div className="d1">
                <p>Monthly Sale</p>
                <BarChart dataTime={data.dataTime} />
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 mt-3">
              <div className="d1" style={{ height: "405px", width: "80%" }}>
                <DonutChart data={data} />
              </div>
            </div>
          </div>
        </div>
        <SplashScreen isOpen={loading} />
      </div>
    )
  );
};

export default Dashboard;
