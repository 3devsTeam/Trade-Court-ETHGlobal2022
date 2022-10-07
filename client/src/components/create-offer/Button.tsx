import React from "react";

interface IButtonProps {
  type: any;
  disabled?: boolean;
  onAction?: any;
  name: string;
  width?: string;
}

export const Button = ({
  width,
  disabled,
  name,
  onAction,
  type,
}: IButtonProps) => {
  return (
    <input
      type={type}
      disabled={disabled}
      value={name}
      onClick={() => onAction()}
      className={`bg-purple w-[${width}] rounded-[20px] px-4 py-3 font-bold text-lg text-white transition duration-150 ease-out hover:ease-in cursor-pointer`}
    />
  );
};
