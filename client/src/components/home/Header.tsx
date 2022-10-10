import React from "react";

interface IHeader {
  headers: string[];
}

export const Header = ({ headers }: IHeader) => {
  return (
    <header className='flex justify-between h-12 items-center'>
      {headers.map((h, i) => (
        <div key={i}>
          <span className='text-md font-bold'>{h}</span>
        </div>
      ))}
    </header>
  );
};
