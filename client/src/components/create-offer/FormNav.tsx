import React from "react";
import { Button } from "./Button";

export const FormNav = () => {
  return (
    <div
      className={
        "bg-white rounded-[20px] shadow-lg p-5 max-h-[100px] flex justify-between items-center"
      }
    >
      <div className="flex gap-3">
        <Button
          type={"button"}
          onAction={null}
          name={"Prev"}
          color={"purple"}
          rounded={"20px"}
          fWeight={"bold"}
          fSize={"lg"}
          tColor={"white"}
        />
        <Button
          type={"button"}
          onAction={null}
          name={"Next"}
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
