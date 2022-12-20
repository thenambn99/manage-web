import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@/assets/imgs/dashboard.png'
import DashboardIconActive from '@/assets/imgs/dashboard-active.png'
import ProductsIcon from '@/assets/imgs/product.png'
import ProducstIconActive from '@/assets/imgs/product-active.png'
import OrdersIcon from '@/assets/imgs/order.png'
import OrdersIconActive from '@/assets/imgs/order-active.png'
import SettingsIcon from '@/assets/imgs/settings.png'
import SettingsIconActive from '@/assets/imgs/settings-active.png'
import { getAuth } from "@/utils/localStorage";
import { useState } from "react";
import { CONSTS } from "@/consts";

const Sidebar = () => {
  const auth = JSON.parse(getAuth())
  const [isAdmin, setIsAdmin] = useState(false)
  const sidebarMenu = [
    {
      path: "/",
      name: "Dashboard",
      icon: DashboardIcon,
      iconActive: DashboardIconActive
    },
    {
      path: "/products",
      name: "Products",
      icon: ProductsIcon,
      iconActive: ProducstIconActive
    },
    {
      path: "/orders",
      name: "Orders",
      icon: OrdersIcon,
      iconActive: OrdersIconActive
    },
    {
      path: "/settings",
      name: "Settings",
      icon: SettingsIcon,
      iconActive: SettingsIconActive
    },
  ];
  useEffect(() => {
    if (auth?.role === CONSTS.ADMIN_ROLE) {
      setIsAdmin(true)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="sidebar sidebar-wrapper d-flex flex-column">
      <div className="sidebar-menu">
        {sidebarMenu.filter((menu) => !isAdmin ? menu.name !== "Settings" : menu).map((menu, i) => (
          <NavLink to={menu.path} key={i}>
            {({ isActive }) => (
              <div className="sidebar-block">
                <div className={isActive ? "active" : "inactive"}>
                  <span>
                    <img src={isActive ? menu.iconActive: menu.icon} className="img" alt="menu" />
                    { menu.name }  
                  </span>
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
