import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Arrow } from "../../Arrow";
import { FormNav } from "../FormNav";
import { useActions } from "../../../hooks/useActions";
import { useForm } from "react-hook-form";
import { IOffer } from "../../../models/models";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import Select from "react-select";
import { TimeLimit } from "../TimeLimit";

export const Step3 = () => {
  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment } =
    useActions();
  const { fiat, comment } = useTypedSelector((state) => state.offerReducer);

  return (
    <form className={"flex flex-col gap-5"}>
      <TimeLimit
        onAction={setTimeLimit}
        label={"Order time limit"}
        times={["15", "30", "45", "60", "120"]}
      />
      <label>
        <p className={"text-lg font-bold mb-1 ml-[10px]"}>
          {"Order price limit"}
        </p>
        <div className={"flex justify-between"}>
          <Input
            type={"number"}
            onAction={setMinPriceLimit}
            placeholder={"Min"}
            element={fiat}
          />
          <Input
            type={"number"}
            onAction={setMaxPriceLimit}
            placeholder={"Max"}
            element={fiat}
          />
        </div>
      </label>

      <TextArea
        value={comment}
        onAction={setComment}
        label={"Comment"}
        placeholder={"Enter comment"}
      />
    </form>
  );
};
