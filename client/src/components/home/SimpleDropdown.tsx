import React from "react";
import { Arrow } from "../Arrow";

interface ISimpleDropdown {
  activeImage?: string;
  activeSelect: string;
}

export const SimpleDropdown = ({
  activeSelect,
  activeImage,
}: ISimpleDropdown) => {
  return (
    <div
      className={
        "bg-white rounded-[20px] px-[18px] py-[10px] h-full shadow-customDark flex items-center justify-between"
      }
    >
      <img src={activeImage} alt="" />
      <span className={"text-lg font-bold"}>{activeSelect}</span>
      <Arrow />
    </div>
  );
};
