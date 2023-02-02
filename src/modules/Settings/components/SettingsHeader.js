import React from "react";
import { NavLink } from "react-router-dom";

const menuTab = [
  {
    path: "users",
    name: "Users",
  },
  {
    path: "categories",
    name: "Categories",
  },
  {
    path: "coupons",
    name: "Coupons"
  }
];

const SettingsHeader = () => {
  return (
    <div className="h-100 d-flex">
      {menuTab.map((tab, i) => (
        <NavLink to={tab.path} key={i} className="h-100">
          {({ isActive }) => (
            <div
              className={
                isActive
                  ? "px-3 h-100 d-flex align-items-center router-link-active"
                  : "px-3 h-100 d-flex align-items-center"
              }
            >
              <span>{tab.name}</span>
            </div>
          )}
        </NavLink>
      ))}
      {/* <NavLink to="users" className="h-100 d-flex align-items-center">
        <div className="px-4">Users</div>
      </NavLink>
      <NavLink to="categories" className="h-100 d-flex align-items-center">
        <div className="px-4">Categories</div>
      </NavLink> */}
    </div>
  );
};

export default SettingsHeader;
