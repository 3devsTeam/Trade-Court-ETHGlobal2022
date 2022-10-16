import React from "react";

interface IButtonProps {
  disabled?: boolean;
  name: string;
  onClick: any;
}

export const Button = ({ disabled, name, onClick }: IButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      value={name}
      type='button'
      disabled={disabled}
      className={`rounded-[20px] px-4 py-3 font-bold text-lg text-white transition duration-150 ease-out hover:ease-in cursor-pointer`}
    />
  );
};
