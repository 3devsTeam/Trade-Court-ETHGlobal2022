import React from "react";
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

export const Step2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    setPaymentDescription,
    addPaymentMethod,
    setCardNumber,
    setRegion,
    setPaymentMethod,
    prevStep,
    nextStep,
    //resetPayment,
  } = useActions();
  const {
    fiat,
    cardNumber,
    region,
    paymentMethod,
    paymentDescription,
    payMethods,
  } = useTypedSelector((state) => state.offerReducer);

  const addPayment = () => {
    const newPayment: any = {
      paymentMethod,
      region,
      cardNumber,
      paymentDescription,
    };
    addPaymentMethod(newPayment);
    //resetPayment();
  };

  const { banks, regions } = fiat;

  const paymentName = paymentMethod?.name;
  const paymentLogoUrl = paymentMethod?.logoUrl;

  const regionName = region?.name;
  const regionLogoUrl = region?.logoUrl;

  return (
    <form className='flex flex-col gap-5'>
      <Wrapper>
        {payMethods.length ? (
          <div>
            <span className={"text-lg font-bold mb-1 ml-[10px]"}>
              Payment Methods
            </span>
            <div className={"flex gap-1 overflow-x-auto"}>
              {/* <div className={"h-[60px] w-full flex items-center justify-center"}>
               <span className={"font-bold text-purple text-lg"}>
                 No payments yet...
               </span>
             </div> */}

              {payMethods?.map((p) => {
                return <Payment payment={p} showCloseButton={true} />;
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        <label>
          <span className={"text-lg font-bold mb-1 ml-[10px]"}>
            Add Payment Method
          </span>
          <div className={"flex items-center gap-1"}>
            <Dropdown
              image={paymentLogoUrl}
              value={paymentName}
              data={banks}
              onAction={setPaymentMethod}
            />
            <Dropdown
              image={regionLogoUrl}
              value={regionName}
              data={regions}
              onAction={setRegion}
            />
          </div>
        </label>

        <Input
          register={register("cardNumber")}
          value={cardNumber!}
          label={"Card Number"}
          placeholder={"Enter card number"}
          onAction={setCardNumber}
        />
        <TextArea
          register={register("paymentDescription")}
          value={paymentDescription}
          onAction={setPaymentDescription}
          label={"Payment description"}
          placeholder={"..."}
        />
        <Button name={"Add"} onClick={addPayment} />
      </Wrapper>
      <Wrapper>
        <div className='flex gap-5'>
          <Button onClick={prevStep} disabled={false} name={"Back"} />
          <Button onClick={nextStep} disabled={false} name={"Next"} />

          {/* <SubmitButton name={"Next"} disabled={false} /> */}
        </div>
      </Wrapper>
    </form>
  );
};
