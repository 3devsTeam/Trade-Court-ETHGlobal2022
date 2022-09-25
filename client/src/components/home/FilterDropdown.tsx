import React from "react";
import { Arrow } from "../Arrow";

interface IFilterDropdown {
  label: string;
  activeSelect: string;
}

export const FilterDropdown = ({ label, activeSelect }: IFilterDropdown) => {
  return (
    <div
      className={
        "bg-white shadow-customDark rounded-[20px] flex justify-between items-center px-5 py-[13px]"
      }
    >
      <div>
        <span className={"font-bold text-lg"}>{label}</span>
      </div>
      <button
        className={
          "flex items-center border-2 border-purple rounded-[10px] p-[5px] h-full w-[60%] justify-between"
        }
      >
        <span className={"text-gray text-md font-bold"}>{activeSelect}</span>
        <Arrow />
      </button>
    </div>
  );
};
