import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OfferService } from "../../services/offer.services";
import { multiply } from "../../utils/multiply";
import { Modal } from "../modal/Modal";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IFormNav {
  children: React.ReactNode;
}

export const FormNav = ({ children }: IFormNav) => {
  return (
    <div
      className={`bg-white rounded-[20px] shadow-lg max-h-[100px] flex justify-between items-center`}
    >
      {children}
    </div>
  );
};
