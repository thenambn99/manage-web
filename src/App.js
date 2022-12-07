import "./App.css";
import { useRoutes } from "react-router-dom";
import Login from "./modules/Login/page/Login";
import Dashboard from "./modules/Dashboard/Dashboard";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Dashboard></Dashboard>
    },
    {
      path: "/login",
      element: <Login></Login>
    }
  ])
  return routes
}

export default App;
