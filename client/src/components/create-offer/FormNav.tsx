import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { OfferService } from "../../services/offer.services";
import { multiply } from "../../utils/multiply";
import { Modal } from "../modal/Modal";
import { useNavigate } from "react-router";

export const FormNav = ({ children }: any) => {
  return (
    <div
      className={
        "bg-white rounded-[20px] shadow-lg p-5 max-h-[100px] flex justify-between items-center"
      }
    >
      {children}
    </div>
  );
};
