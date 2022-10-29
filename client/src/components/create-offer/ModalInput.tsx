import { stat } from "fs";
import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Label } from "../ui/Label";
// import defaultImg from "../../assets/defaultImg.svg";

interface IModalInput {
  fullName: string;
  image: string;
  onOpen: any;
  label: string;
  symbol: string;
}

export const ModalInput = ({
  onOpen,
  label,
  symbol,
  image,
  fullName,
}: IModalInput) => {
  return (
    <div>
      <Label label={label} />
      <button
        type='button'
        onClick={() => onOpen()}
        className='flex items-center space-x-2 w-full p-3 inputBorder rounded-[15px]'
      >
        <img
          className={"w-8 h-8 rounded-[50%] shadow-customDark object-cover"}
          src={image}
          alt={""}
        />
        <span className={"font-bold"}>
          {symbol} <span className={"text-gray-300 font-bold"}>{fullName}</span>
        </span>
      </button>
    </div>
  );
};
