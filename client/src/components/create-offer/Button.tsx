import React from "react";

interface IButtonProps {
  type: "submit" | "button";
  onAction: any;
  name: string;
  color?: string;
  rounded?: string;
  fWeight: string;
  fSize: string;
  tColor: string;
}

export const Button = ({
  type,
  color,
  rounded,
  name,
  fWeight,
  fSize,
  tColor,
  onAction,
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={() => onAction()}
      className={`bg-${color} rounded-[${rounded}] px-4 py-3 font-${fWeight} text-${fSize} text-${tColor} transition duration-150 ease-out hover:ease-in`}
    >
      {name}
    </button>
  );
};
