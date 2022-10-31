import React, { ReactNode } from "react";

interface ILegend {
  fields: ReactNode[];
}

export const Legend = ({ fields }: ILegend) => {
  return (
    <div className='flex items-center justify-between'>
      {fields.map((field, i) => field)}
    </div>
  );
};
