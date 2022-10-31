import { Suspense, useState, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Settings } from "./pages/Settings";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const CreateOffer = lazy(() => import("./pages/CreateOffer"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  useEffect(() => {
    if (Cookies.get("jwt")) {
      console.log("yes");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main className='max-w-5xl mx-auto'>
        <Suspense fallback={<></>}>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path={"/create-offer"} element={<CreateOffer />} />
            <Route path={"/settings"} element={<Settings />} />
            <Route path={"/transaction/:id"} element={<Transaction />} />
            <Route path={"/profile"} element={<Profile />} />
            {/* </Route> */}

            <Route path={"/"} element={<Home />} />
            <Route path={"*"} element={<Navigate to={"/"} />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
