import React from "react";

interface IProgressBar {
  steps: string[];
  images: string[];
  activeStep: number;
}

export const ProgressBar = ({ steps, images, activeStep }: IProgressBar) => {
  return (
    <div className={"flex justify-around items-center"}>
      {steps.map((s, i) => {
        return (
          <div key={i} className={"flex flex-col items-center"}>
            <div
              className={`${
                activeStep - 1 === i ? "bg-purple" : "bg-gray"
              } rounded-[50%] text-center h-[40px] w-[40px]`}
            >
              <img
                className={"m-auto relative top-[50%] -translate-y-1/2"}
                src={images[i]}
                alt=""
              />
            </div>

            <span
              className={`${
                activeStep - 1 === i ? "text-black" : "text-gray"
              } text-sm font-bold`}
            >
              {i + 1}. {s}
            </span>
          </div>
        );
      })}
    </div>
  );
};
