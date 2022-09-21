import React, { useState, useEffect } from "react";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Preview } from "../components/create-offer/Preview";
import { Progressbar } from "../components/create-offer/Progressbar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Step1 } from "../components/create-offer/form-pages/Step1";
import { Step2 } from "../components/create-offer/form-pages/Step2";
import { Step3 } from "../components/create-offer/form-pages/Step3";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { OfferService } from "../services/offer.services";
import { totalAmount } from "../utils/totalAmount";
import { Modal } from "../components/modal/Modal";
import { Button } from "../components/create-offer/Button";
import { multiply } from "../utils/multiply";
import { toast } from "react-toastify";

export const CreateOffer = () => {
  const { step } = useTypedSelector((state) => state.formReducer);

  const { nextStep, prevStep } = useActions();

  const navigate = useNavigate();

  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    orderLimit,
    offerComment,
    payMethods,
  } = useTypedSelector((state) => state.offerReducer);

  const arr = payMethods.map((e) => {
    return {
      bank: e.paymentMethod._id,
      cardNumber: e.cardNumber,
      region: e.region._id,
      paymentDescription: e.paymentDescription,
    };
  });

  const successOfferNotify = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const createHandler = () => {
    console.log("create offer");

    OfferService.create({
      offerType: "buy",
      fiat: fiat._id,
      unitPrice,
      amount: multiply(unitPrice, quantity),
      quantity,
      orderLimit,
      crypto: crypto._id,
      offerComment,
      payMethods: arr,
    })
      .then(
        () => successOfferNotify("Offer is created!")
        //resetOffer();
      )
      .then(() => navigate("/"));
  };

  const steps = ["Offer Price", "Payment method", "Settings"];

  return (
    <div>
      <Progressbar steps={steps} step={step} />
      <div className={"grid grid-cols-2 gap-5"}>
        <Form>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </Form>
        <Preview />
        <FormNav>
          <div className="flex gap-3">
            {step > 1 && (
              <Button
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
              onAction={() => {
                step < 3 ? nextStep() : step === 3 ? createHandler() : null;
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
            onAction={null}
            name={"Help"}
            fWeight={"bold"}
            fSize={"lg"}
            tColor={"purple"}
          />
        </FormNav>
      </div>
    </div>
  );
};
