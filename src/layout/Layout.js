import React from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="d-flex flex-root">
        <Header></Header>
        <div className="w-100 flex-wrapper d-flex justify-content-between align-items-center">
          <Sidebar></Sidebar>
          <div className="flex-content-sidebar">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
