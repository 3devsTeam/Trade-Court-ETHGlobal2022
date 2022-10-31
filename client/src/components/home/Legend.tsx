import React, { ReactNode } from "react";

interface ILegend {
  fields: ReactNode[];
}

export const Legend = ({ fields }: ILegend) => {
  return (
    <div className='flex items-center font-bold px-4'>
      {fields.map((field) => field)}
    </div>
  );
};
