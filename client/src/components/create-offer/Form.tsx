import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IForm {
  children: React.ReactNode;
}

export const Form = ({ children }: IForm) => {
  return (
    <div className={`bg-white break-words rounded-[20px] shadow-lg p-5`}>
      {children}
    </div>
  );
};
