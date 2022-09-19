import React from "react";

interface IOfferInput {
  setValue: React.Dispatch<any>;
  maxValue: number;
  inputContent: any;
  value: number;
  placeholder: string;
}

export const OfferInput = ({
  inputContent,
  placeholder,
  value,
  setValue,
  maxValue,
}: IOfferInput) => {
  return (
    <div
      className={
        "flex items-center border-2 border-purple rounded-[20px] p-3 font-bold"
      }
    >
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        value={value ? value : ""}
        className={"w-full outline-none"}
      />
      <div className={"flex gap-1"}>
        <button onClick={() => setValue(maxValue)} className={"text-purple"}>
          Max
        </button>
        <span className={"text-gray"}>|</span>
        {inputContent}
      </div>
    </div>
  );
};
