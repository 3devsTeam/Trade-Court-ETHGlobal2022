import React from "react";

interface IFormLayout {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: IFormLayout) => {
  return <div className={"grid grid-cols-2 gap-5"}>{children}</div>;
};
