import "./App.css";
import RootRoutes from "./router/RootRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RootRoutes></RootRoutes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
