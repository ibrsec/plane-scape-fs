import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MyFlights from "../pages/MyFlights";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        <Route path="/myflights" element={<PrivateRouter />}>
          <Route path="" element={<MyFlights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
