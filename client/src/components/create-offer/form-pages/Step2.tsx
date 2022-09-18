import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Arrow } from "../../Arrow";
import { FormNav } from "../FormNav";
import { useActions } from "../../../hooks/useActions";
import { useForm } from "react-hook-form";
import { IOffer, IRegion, IBank } from "../../../models/models";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { Payment } from "../Payment";

export const Step2 = () => {
  const {
    setPaymentDescription,
    addPaymentMethod,
    setCardNumber,
    setRegion,
    setPaymentMethod,
    //resetPayment,
  } = useActions();
  const {
    fiat,
    cardNumber,
    region,
    paymentMethod,
    paymentDescription,
    paymentMethods,
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
    <form className={"flex flex-col gap-5"}>
      <div>
        <p className={"text-lg font-bold mb-1 ml-[10px]"}>Payment methods</p>
        <div className={"flex gap-1 overflow-x-auto"}>
          {!paymentMethods.length && (
            <div className={"h-[60px] w-full flex items-center justify-center"}>
              <span className={"font-bold text-purple text-lg"}>
                No payments yet...
              </span>
            </div>
          )}
          {paymentMethods?.map((payment) => (
            <Payment {...payment} />
          ))}
        </div>
      </div>

      <label>
        <p className={"text-lg font-bold mb-1 ml-[10px]"}>Add payment method</p>
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
        value={cardNumber}
        type={"text"}
        label={"Card Number"}
        placeholder={"Enter card number"}
        onAction={setCardNumber}
      />
      <TextArea
        value={paymentDescription}
        onAction={setPaymentDescription}
        // minLength={'110px'}
        // maxLength={'250px'}
        label={"Payment description"}
        placeholder={"Enter payment description"}
      />
      <Button
        type={"button"}
        name={"Add"}
        onAction={addPayment}
        color={"purple"}
        fWeight={"bold"}
        fSize={"lg"}
        tColor={"white"}
        rounded={"15px"}
      />
    </form>
  );
};
