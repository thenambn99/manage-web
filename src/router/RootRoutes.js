import React from "react";
import SplashScreen from "@/components/SplashScreen";
import { Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../modules/Login/page/Login";
import Layout from "@/layout/Layout";
import NotFoundPage from "@/modules/notFound/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import EditProduct from "@/modules/Products/page/EditProduct";
import ProductList from "@/modules/Products/page/ProductList";
const Dashboard = React.lazy(() =>import("../modules/Dashboard/page/Dashboard"));
const Settings = React.lazy(() => import("@/modules/Settings/page/Settings"));
const Products = React.lazy(() => import("@/modules/Products/page/Products"));
const Orders = React.lazy(() => import("@/modules/Orders/page/Orders"));
const Categories = React.lazy(() => import("@/modules/Settings/page/Categories"));
const Users = React.lazy(() => import("@/modules/Settings/page/Users"));
const Coupons = React.lazy(() => import("@/modules/Settings/page/Coupons"))

const RootRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SplashScreen />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <PrivateRoute>
              <Suspense fallback={<SplashScreen />}>
                <Products />
              </Suspense>
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<SplashScreen />}>
                  <ProductList />
                </Suspense>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <PrivateRoute>
                  <Suspense fallback={<SplashScreen />}>
                    <EditProduct />
                  </Suspense>
                </PrivateRoute>
              ),
            },
            {
              path: "new",
              element: (
                <PrivateRoute>
                  <Suspense fallback={<SplashScreen />}>
                    <EditProduct />
                  </Suspense>
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<SplashScreen />}>
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "settings",
          element: (
            <PrivateRoute>
              <Suspense fallback={<SplashScreen />}>
                <Settings />
              </Suspense>
            </PrivateRoute>
          ),
          children: [
            { 
              index: true,
              path: "users",
              element: (
                <PrivateRoute>
                  <Suspense fallback={<SplashScreen />}>
                    <Users />
                  </Suspense>
                </PrivateRoute>
              ),
            },
            {
              path: "categories",
              element: (
                <PrivateRoute>
                  <Suspense fallback={<SplashScreen />}>
                    <Categories />
                  </Suspense>
                </PrivateRoute>
              ),
            },
            {
              path: "coupons",
              element: (
                <PrivateRoute>
                  <Suspense fallback={<SplashScreen />}>
                    <Coupons />
                  </Suspense>
                </PrivateRoute>
              ),
            }
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/notfound",
      element: <NotFoundPage />
    },
    {
      path: "*",
      element: <Navigate to="/notfound" replace />,
    },
  ]);
  return routes;
};

export default RootRoutes;
