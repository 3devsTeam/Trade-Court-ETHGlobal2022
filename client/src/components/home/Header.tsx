import React from "react";

export const Header = () => {
  return (
    <div className="grid grid-cols-offer gap-5 px-[20px]">
      <div>
        <span className="font-md">Maker address</span>
      </div>
      <div>
        <span className="font-md">Avaliable / Limit</span>
      </div>
      <div>
        <span className="font-md">Unit Price</span>
      </div>
      <div>
        <span className="font-md">Payment methods</span>
      </div>
      <div>
        <span className="font-md">Buy / Sell</span>
      </div>
    </div>
  );
};
