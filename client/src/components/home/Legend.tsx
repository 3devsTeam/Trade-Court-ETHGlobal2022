import React from "react";

interface ILegend {
  fields: string[];
}

export const Legend = ({ fields }: ILegend) => {
  return (
    <div className='flex items-center justify-between'>
      {fields.map((field, i) => (
        <div key={i}>
          <span className='text-md font-bold'>{field}</span>
        </div>
      ))}
    </div>
  );
};
