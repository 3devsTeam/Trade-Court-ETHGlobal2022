import React from "react";

export const Preview = () => {
  return (
    <div className={"bg-white rounded-[20px] shadow-lg row-span-2 break-words"}>
      <div className={"bg-purple rounded-t-[20px] p-5"}>
        <p className={"text-white text-[32px] font-bold"}>Preview</p>
      </div>

      <div className={"flex flex-col gap-5 p-5"}>
        <div className={"flex items-center justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Crypto</span>
          </div>
          <div className={"flex gap-2 items-center"}>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Fiat</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Unit Price</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Quantity</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Total Amount</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Payment Methods</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Time Limit</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Price Limit</span>
          </div>
          <div>-</div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Comment</span>
          </div>
          <div>-</div>
        </div>
      </div>
    </div>
  );
};
