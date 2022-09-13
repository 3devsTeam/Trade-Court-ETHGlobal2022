import React, { useEffect } from "react";
import { Step1 } from "./form-pages/Step1";
import { Step2 } from "./form-pages/Step2";
import { Step3 } from "./form-pages/Step3";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const Form = () => {
  const { step } = useTypedSelector((state) => state.formReducer);

  return (
    <div
      className={
        "bg-white break-words rounded-[20px] shadow-lg p-5 min-h-[505px]"
      }
    >
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
};
