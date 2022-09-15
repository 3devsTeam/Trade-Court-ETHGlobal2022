import React from "react";

interface IOfferInput {
  height: string;
  type: string;
  action: any;
  value: string;
  placeholder: string;
  elementInInput: any;
  maxValue: string;
}

export const OfferInput = ({
  height,
  type,
  action,
  value,
  placeholder,
  elementInInput,
  maxValue,
}: IOfferInput) => {
  console.log(maxValue);

  return (
    <label>
      <div
        className={`flex justify-between h-[${height}] items-center border-2 border-purple rounded-[10px] font-bold px-[10px] py-[6px]`}
      >
        <input
          type={type}
          onChange={(e) => action(e.target.value)}
          value={value}
          placeholder={placeholder}
          className="w-full text-lg"
        />
        <button onClick={() => action(maxValue)} className="text-purple mr-2">
          Max
        </button>
        <span>{elementInInput}</span>
      </div>
    </label>
  );
};
