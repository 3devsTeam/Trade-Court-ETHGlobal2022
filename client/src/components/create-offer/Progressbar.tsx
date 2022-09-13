import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const Progressbar = () => {
  const steps = ["Offer Price", "Payment Method", "Settings"];
  const { step } = useTypedSelector((state) => state.formReducer);

  const counterStep = (arr: string[]) => {
    return arr.map((stepName, i) => {
      return (
        <div key={i} className={"flex flex-col items-center"}>
          <p
            className={`${
              step === i + 1 ? "text-black" : "text-gray"
            } transition duration-300 font-bold mb-2`}
          >
            {stepName}
          </p>
          <div
            className={`text-white h-[40px] w-[40px] rounded-[9999px] flex justify-center items-center font-bold ${
              step === i + 1 ? "bg-purple" : "bg-gray"
            } transition duration-300`}
          >
            {i + 1}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={
        "bg-white flex justify-between mb-[22px] rounded-[20px] px-[21px] py-[12px] shadow-lg"
      }
    >
      {counterStep(steps)}
    </div>
  );
};
