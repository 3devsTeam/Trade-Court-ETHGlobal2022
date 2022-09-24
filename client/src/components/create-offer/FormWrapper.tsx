import React from "react";

interface IFormWrapper {
  children: React.ReactNode;
}

export const FormWrapper = ({ children }: IFormWrapper) => {
  return (
    <div
      className={
        "flex flex-col bg-white rounded-[20px] p-5 gap-5 shadow-customDark h-full w-full"
      }
    >
      {children}
    </div>
  );
};
