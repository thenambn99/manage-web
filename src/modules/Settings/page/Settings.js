import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SettingsHeader from "../components/SettingsHeader";

const Settings = () => {
  const navigate = useNavigate()
  useEffect(() =>{
    navigate('users')
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <div className="with-navbar">
        <SettingsHeader />
      </div>
      <div className="content-layout">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Settings;
