import { Suspense, useState, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Settings } from "./pages/Settings";
import { Navigate } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";

const CreateOffer = lazy(() => import("./pages/CreateOffer"));
const Transaction = lazy(() => import("./pages/Transaction"));

const App = () => {
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
            {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
          </Routes>
        </Suspense>
      </main>
      {/* <Footer message={"Beta Version. Use at your own risk."} /> */}
    </BrowserRouter>
  );
};

export default App;
