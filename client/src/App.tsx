import { Suspense, useState, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Settings } from "./pages/Settings";
import { Transaction } from "./pages/Transaction";
import { Navigate } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOffer = lazy(() => import("./pages/CreateOffer"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className='max-w-5xl mx-auto'>
        <Suspense fallback={<h1>loading...</h1>}>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path={"/create-offer"} element={CreateOffer} />
            <Route path={"/settings"} element={<Settings />} />
            <Route path={"/transaction/:id"} element={<Transaction />} />
            <Route path={"/profile"} element={<Profile />} />
            {/* </Route> */}

            <Route path={"/"} element={<Home />} />
            {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
