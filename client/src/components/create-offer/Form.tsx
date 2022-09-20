import React from "react";

export const Form = ({ children }: any) => {
  return (
    <div className={"bg-white break-words rounded-[20px] shadow-lg p-5"}>
      {children}
    </div>
  );
};
