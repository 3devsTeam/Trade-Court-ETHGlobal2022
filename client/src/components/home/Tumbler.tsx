import React from "react";

interface ITumbler {
  names: string[];
  activeButton: boolean;
}

export const Tumbler = ({ names, activeButton }: ITumbler) => {
  return (
    <div
      className={
        "bg-white rounded-[20px] shadow-customDark px-[20px] py-[10px]"
      }
    >
      <div className={"flex items-center"}>
        <Button activeButton={true} name={names[0]} roundedSide={"left"} />
        <Button activeButton={false} name={names[1]} />
      </div>
    </div>
  );
};

interface IButton {
  name: string;
  activeButton: boolean;
  roundedSide?: string;
}

const Button = ({ name, activeButton, roundedSide }: IButton) => {
  return (
    <button
      className={`${
        roundedSide === "left" ? "rounded-l-[10px]" : "rounded-r-[10px]"
      } ${
        activeButton ? "bg-green" : "bg-gray"
      } h-[40px] min-w-[100px] font-bold w-full ${
        activeButton ? "text-white" : "text-black"
      }`}
    >
      {name}
    </button>
  );
};
