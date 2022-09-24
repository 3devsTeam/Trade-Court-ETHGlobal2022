import React from "react";

export const Header = () => {
  return (
    <div className="grid grid-cols-offer gap-5 px-[20px] mb-[20px]">
      <div>
        <p className="text-lg font-bold">Maker address</p>
      </div>
      <div>
        <p className="text-lg font-bold">Avaliable / Limit</p>
      </div>
      <div>
        <p className="text-lg font-bold">Unit Price</p>
      </div>
      <div>
        <p className="text-lg font-bold">Payment methods</p>
      </div>
      <div>
        <p className="text-lg font-bold">Buy / Sell</p>
      </div>
    </div>
  );
};
