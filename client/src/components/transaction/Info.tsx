import React from "react";

export const Info = () => {
  return (
    <div
      className={
        "bg-white flex justify-between h-[100px] shadow-lg rounded-[20px] items-center px-[20px] py-[12px]"
      }
    >
      <div className={"flex flex-col"}>
        <div>
          <span className={"text-lg font-bold"}>You send</span>
          <span className={"text-lg font-bold text-purple"}> RUB</span>
        </div>
        <div>
          <span className={"text-lg font-bold"}>You send</span>
          <span className={"text-lg font-bold text-purple"}> USDT</span>
        </div>
      </div>

      <div className={"flex flex-col"}>
        <span className={"text-lg font-bold"}>Amount</span>
        <span className={"text-lg font-bold text-purple"}>0</span>
      </div>

      <div className={"flex flex-col"}>
        <span className={"text-lg font-bold"}>Unit Price</span>
        <span className={"text-lg font-bold text-purple"}>0</span>
      </div>

      <div className={"flex flex-col"}>
        <span className={"text-lg font-bold"}>Quantity</span>
        <span className={"text-lg font-bold text-purple"}>0</span>
      </div>
    </div>
  );
};
