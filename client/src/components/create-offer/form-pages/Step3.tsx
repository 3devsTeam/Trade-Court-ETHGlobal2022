import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Arrow } from "../../../assets/icons/Arrow";
import { useActions } from "../../../hooks/useActions";
import { IOffer } from "../../../models/models";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { TimeLimit } from "../TimeLimit";
import { totalAmount } from "../../../utils/totalAmount";
import { Wrapper } from "../Wrapper";
import { useForm } from "react-hook-form";

export const Step3 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment } =
    useActions();
  const { fiat, offerComment, orderLimit } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { ticker } = fiat;

  return (
    <Wrapper>
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
            register={register("")}
            value={orderLimit[0]}
            onAction={setMinPriceLimit}
            placeholder={"Min"}
            element={ticker}
          />
          <Input
            register={register("")}
            value={orderLimit[1]}
            maxValue={totalAmount()}
            onAction={setMaxPriceLimit}
            placeholder={"Max"}
            element={ticker}
          />
        </div>
      </label>

      <TextArea
        register={register("")}
        value={offerComment ? offerComment : ""}
        onAction={setComment}
        label={"Comment"}
        placeholder={"Enter comment"}
      />
    </Wrapper>
  );
};
