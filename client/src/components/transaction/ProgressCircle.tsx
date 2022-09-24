import React from "react";

interface IProgressCircle {
  image: string;
  label: string;
}

export const ProgressCircle = ({ image }: IProgressCircle) => {
  return (
    <div
      className={
        "bg-gray rounded-[50%] w-[40px] h-[40px] flex justify-center items-center"
      }
    >
      <img src={image} alt="" />
    </div>
  );
};
