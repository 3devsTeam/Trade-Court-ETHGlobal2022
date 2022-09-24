import React from "react";

interface IButtonProps {
  disabled?: boolean;
  onAction: any;
  name: string;
  color?: string;
  rounded?: string;
  fWeight: string;
  fSize: string;
  tColor: string;
}

export const Button = ({
  disabled,
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
      disabled={disabled}
      type="button"
      onClick={() => onAction()}
      className={`bg-${
        !disabled ? color : "gray"
      } rounded-[${rounded}] px-4 py-3 font-${fWeight} text-${fSize} text-${tColor} transition duration-150 ease-out hover:ease-in`}
    >
      {name}
    </button>
  );
};
