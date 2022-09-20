import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { CreateOffer } from "./pages/CreateOffer";
import { Home } from "./pages/Home";
import { PrivateRoutes } from "./pages/PrivateRoutes";
import { Settings } from "./pages/Settings";
import { Transaction } from "./pages/Transaction";
import { Navigate } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="mobile:px-[3%] tablet:px-[5%] desktop:px-[10%] py-[3%]">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={"/create-offer"} element={<CreateOffer />} />
            <Route path={"/settings"} element={<Settings />} />
            <Route path={"/transaction/:_id"} element={<Transaction />} />
            <Route path={"/profile"} element={<Profile />} />
          </Route>

          <Route path={"/"} element={<Home />} />
          {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
        </Routes>
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
