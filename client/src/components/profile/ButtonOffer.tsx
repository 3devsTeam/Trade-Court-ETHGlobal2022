import React from "react";
import { Cross } from "../Cross";

interface IButtonOffer {
  onAction: any;
  image: React.ReactNode;
  bgColor: string;
}

export const ButtonOffer = ({ onAction, image, bgColor }: IButtonOffer) => {
  return (
    <button
      onClick={() => onAction()}
      className={`${bgColor} p-[7px] rounded-[10px] text-white hover:scale-125 transition-transform duration-300`}
    >
      {image}
    </button>
  );
};
