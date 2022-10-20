import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Arrow } from "../../ui/icons/Arrow";
import { useActions } from "../../../hooks/useActions";
import { IOffer } from "../../../models/models";
import { TextArea } from "../TextArea";
import { TimeLimit } from "../TimeLimit";
import { Button } from "../../ui/Button";
import { SubmitButton } from "../../ui/SubmitButton";
import { totalAmount } from "../../../utils/totalAmount";
import { Wrapper } from "../Wrapper";

export const Step3 = ({ createHandler }: any) => {
  const {
    setMinPriceLimit,
    setMaxPriceLimit,
    setTimeLimit,
    setComment,
    prevStep,
  } = useActions();
  const { fiat, offerComment, minLimit, maxLimit } = useTypedSelector(
    (state) => state.offerReducer
  );
  const { ticker } = fiat;

  return (
    <form>
      <Wrapper>
        <TimeLimit
          onAction={setTimeLimit}
          label={"Order Time Limit"}
          times={["15", "30", "45", "60", "120"]}
        />
        <label>
          <span className={"text-lg font-bold mb-1 ml-[10px]"}>
            {"Order Price Limit"}
          </span>
          <div className={"flex justify-between gap-1"}>
            <Input
              value={minLimit}
              onAction={setMinPriceLimit}
              placeholder={"Min"}
              element={ticker}
            />
            <Input
              value={maxLimit}
              maxValue={totalAmount()}
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
      </Wrapper>

      <Wrapper>
        <Button onClick={prevStep} name='Back' />
        <Button onClick={createHandler} name='Create' />
      </Wrapper>
    </form>
  );
};
