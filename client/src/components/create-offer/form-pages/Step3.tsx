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

interface Props {
  handleCreateOffer: () => void;
}

export const Step3 = ({ handleCreateOffer }: Props) => {
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

  const checkStep3 = () => {
    if (minLimit > 0 && maxLimit > 0 && minLimit < maxLimit) return false;
    return true;
  };

  return (
    <form className='flex flex-col gap-5'>
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
        <div className='flex gap-5'>
          <Button onClick={prevStep} name='Back' />
          <Button
            disabled={checkStep3()}
            onClick={handleCreateOffer}
            name='Create'
          />
        </div>
      </Wrapper>
    </form>
  );
};
