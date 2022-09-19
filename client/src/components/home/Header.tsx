import React from "react";

export const Header = () => {
  return (
    <div className="grid grid-cols-offer gap-5 px-[20px] mb-[20px]">
      <div>
        <p className="font-md">Maker address</p>
      </div>
      <div>
        <p className="font-md">Avaliable / Limit</p>
      </div>
      <div>
        <p className="font-md">Unit Price</p>
      </div>
      <div>
        <p className="font-md">Payment methods</p>
      </div>
      <div>
        <p className="font-md">Buy / Sell</p>
      </div>
    </div>
  );
};
