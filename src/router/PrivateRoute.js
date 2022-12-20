import { getAuth } from "@/utils/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    if (!auth) {
      navigate("/notfound");
    }
    // eslint-disable-next-line
  }, []);

  return children;
};

export default PrivateRoute;
