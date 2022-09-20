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
import { TimeLimit } from "../TimeLimit";
import { totalAmount } from "../../../utils/totalAmount";

export const Step3 = () => {
  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment } =
    useActions();
  const { fiat, offerComment, orderLimit } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { ticker } = fiat;

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
        <div className={"flex justify-between gap-1"}>
          <Input
            value={orderLimit[0]}
            type={"number"}
            onAction={setMinPriceLimit}
            placeholder={"Min"}
            element={ticker}
          />
          <Input
            value={orderLimit[1]}
            maxValue={totalAmount()}
            type={"number"}
            onAction={setMaxPriceLimit}
            placeholder={"Max"}
            element={ticker}
          />
        </div>
      </label>

      <TextArea
        value={offerComment ? offerComment : ""}
        onAction={setComment}
        label={"Comment"}
        placeholder={"Enter comment"}
      />
    </form>
  );
};
