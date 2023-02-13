import React from "react";
import { Outlet } from "react-router-dom";
import SettingsHeader from "../components/SettingsHeader";

const Settings = () => {

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
