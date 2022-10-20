import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";

import { useActions } from "../../../hooks/useActions";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { TextArea } from "../TextArea";
import { Payment } from "../Payment";
import { Wrapper } from "../Wrapper";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../ui/SubmitButton";
import { Button } from "../../ui/Button";
import { IFiat, IPayment, IRegion } from "../../../models/models";

export const Step2 = () => {
  const { addPaymentMethod, setRegion, setBank, prevStep, nextStep } =
    useActions();
  const { fiat, region, paymentMethod, payMethods } = useTypedSelector(
    (state) => state.offerReducer
  );

  const { items: payments } = payMethods;

  const [paymentDescription, setPaymentDescription] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const addPayment = () => {
    const newPayment: IPayment = {
      id: payments.length.toString(),
      paymentMethod,
      region,
      cardNumber,
      paymentDescription,
    };
    addPaymentMethod(newPayment);
    setPaymentDescription("");
    setCardNumber("");
  };

  const { banks, regions } = fiat;

  const paymentName = paymentMethod?.name;
  const paymentLogoUrl = paymentMethod?.logoUrl;

  const regionName = region?.name;
  const regionLogoUrl = region?.logoUrl;

  const checkCanAddPayment = () => {
    if (payments.length < 5) return true;
    return false;
  };

  return (
    <form className='flex flex-col gap-5'>
      <Wrapper>
        {payments.length ? (
          <div>
            <span className={"text-lg font-bold mb-1 ml-[10px]"}>
              Payment Methods
            </span>
            <div className={"flex gap-1 overflow-x-auto"}>
              {payments.map((p, i) => {
                return <Payment key={i} payment={p} />;
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div>
          <span className={"text-lg font-bold ml-[10px]"}>
            Add Payment Method
          </span>
          <div className={"flex items-center gap-1"}>
            <Dropdown
              image={paymentLogoUrl}
              value={paymentName}
              data={banks}
              onAction={setBank}
            />
            <Dropdown
              image={regionLogoUrl}
              value={regionName}
              data={regions}
              onAction={setRegion}
            />
          </div>
        </div>

        <Input
          value={cardNumber!}
          label={"Card Number"}
          placeholder={"Enter card number"}
          onAction={setCardNumber}
        />
        <TextArea
          value={paymentDescription}
          onAction={setPaymentDescription}
          label={"Payment Description"}
          placeholder={"Here can be written something useful..."}
        />
        <Button
          name={"Add"}
          onClick={addPayment}
          disabled={!checkCanAddPayment()}
        />
      </Wrapper>
      <Wrapper>
        <div className='flex gap-5'>
          <Button onClick={prevStep} disabled={false} name={"Back"} />
          <Button onClick={nextStep} disabled={false} name={"Next"} />
        </div>
      </Wrapper>
    </form>
  );
};
