import React from "react";
import { Cross } from "../../icons/Cross";

interface IButtonOffer {
  onAction: any;
  image: React.ReactNode;
  bgColor: string;
}

export const ButtonOffer = ({ onAction, image, bgColor }: IButtonOffer) => {
  return (
    <button
      onClick={() => onAction()}
      className={`flex justify-center items-center ${bgColor} p-[7px] rounded-[10px] text-white transition-transform duration-300 h-[30px] w-[30px]`}
    >
      {image}
    </button>
  );
};
