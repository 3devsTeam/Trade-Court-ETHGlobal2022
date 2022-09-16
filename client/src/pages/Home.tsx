import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";

export const Home = () => {
  return (
    <>
      <Header />

      <div className="mt-[20px]">
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
      </div>
    </>
  );
};
