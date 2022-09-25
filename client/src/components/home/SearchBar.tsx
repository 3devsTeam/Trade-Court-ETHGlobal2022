import React from "react";
import { Loop } from "../modal/Loop";

export const SearchBar = () => {
  return (
    <div
      className={
        "flex justify-between bg-white shadow-customDark rounded-[20px] h-full items-center px-[20px] gap-2"
      }
    >
      <div className={"flex gap-2"}>
        <Loop />
        <input
          className={"h-full rounded-l-[20px] outline-none font-bold"}
          placeholder={"Enter amount"}
        />
      </div>
      <div>
        <span className={"text-lg text-gray font-bold"}>RUB</span>
      </div>
    </div>
  );
};
