import React from "react";

interface IHeader {
  headers: string[];
}

export const Header = ({ headers }: IHeader) => {
  return (
    <>
      {headers.map((h) => (
        <div>
          <span className="text-md font-bold">{h}</span>
        </div>
      ))}
    </>
  );
};
