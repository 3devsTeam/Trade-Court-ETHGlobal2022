import React from "react";

export const StarFilter = () => {
  return (
    <div
      className={
        "bg-white rounded-[20px] px-[12px] shadow-customDark text-lg font-bold flex items-center justify-between"
      }
    >
      <span>4 stars and up</span>
      <input type={"checkbox"} />
    </div>
  );
};
