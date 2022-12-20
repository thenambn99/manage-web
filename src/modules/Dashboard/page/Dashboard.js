import { getAccessToken } from "@/utils/localStorage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const accessToken = JSON.parse(getAccessToken());
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="">
        <p className="text-primary">Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
