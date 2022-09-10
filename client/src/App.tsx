import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { CreateOffer } from "./pages/CreateOffer";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="mobile:px-[3%] tablet:px-[5%] desktop:px-[10%] py-[3%]">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/create-offer"} element={<CreateOffer />} />
          <Route path={"/settings"} element={<Settings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
