import React from "react";

interface Props {
  label: string;
}

export const Label = ({ label }: Props) => {
  return (
    <label className='block font-bold text-2xl' htmlFor={label}>
      {label}
    </label>
  );
};
