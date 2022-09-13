import React from "react";
import { Button } from "./Button";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const FormNav = () => {
  const { nextStep, prevStep } = useActions();
  const { step } = useTypedSelector((state) => state.formReducer);

  return (
    <div
      className={
        "bg-white rounded-[20px] shadow-lg p-5 max-h-[100px] flex justify-between items-center"
      }
    >
      <div className="flex gap-3">
        {step > 1 && (
          <Button
            type={"button"}
            onAction={prevStep}
            name={"Prev"}
            color={"purple"}
            rounded={"20px"}
            fWeight={"bold"}
            fSize={"lg"}
            tColor={"white"}
          />
        )}
        <Button
          type={"button"}
          onAction={() => {
            step < 3 ? nextStep() : null;
          }}
          name={step === 3 ? "Create offer" : "Next"}
          color={"purple"}
          rounded={"20px"}
          fWeight={"bold"}
          fSize={"lg"}
          tColor={"white"}
        />
      </div>
      <Button
        type={"button"}
        onAction={null}
        name={"Help"}
        fWeight={"bold"}
        fSize={"lg"}
        tColor={"purple"}
      />
    </div>
  );
};
