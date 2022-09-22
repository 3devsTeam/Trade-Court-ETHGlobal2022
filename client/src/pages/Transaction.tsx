import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { OfferService } from "../services/offer.services";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Chat } from "../components/transaction/Chat";
import { Circle } from "../components/create-offer/Circle";
import transfer from "../assets/images/transfer.svg";
import lock from "../assets/images/lock.svg";
import success from "../assets/images/success.svg";
import { ProgressBar } from "../components/transaction/ProgressBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "../components/create-offer/Button";
import { Info } from "../components/transaction/Info";
import { WarningMessage } from "../components/transaction/WarningMessage";
import { io } from "socket.io-client";
import { Main } from "../components/transaction/Main";

export const Transaction = () => {
  const { id } = useParams();

  const socket = io("http://127.0.0.1:3030");

  //socket.on("msg", (data) => console.log(data));

  const [step, setStep] = useState(1);

  const [role, setRole] = useState("");
  //console.log(role);

  const [payMethod, setPayMethod] = useState({});
  //console.log(payMethod);

  const {
    data: offer,
    isLoading,
    isSuccess,
  } = useQuery(["get offer by id"], () => OfferService.getByID(id!), {
    select: (data) => data.data.data.offer,
    onSuccess: (data) => {
      setRole(data.role);
      setPayMethod(data.payMethods[0]);
    },
  });

  return (
    <div>
      {/* it just to check role */}
      <div className={"absolute top-20"}>
        <h1>{role}</h1>
      </div>

      {isLoading ? (
        <Skeleton height={100} borderRadius={20} />
      ) : (
        <Info {...offer} />
      )}

      <div className={"grid grid-cols-form gap-5 mt-[20px]"}>
        <Form>
          {isLoading ? (
            <Skeleton height={50} />
          ) : (
            <div>
              <ProgressBar
                activeStep={step}
                steps={["Transfer", "Approval", "Success"]}
                images={[transfer, lock, success]}
              />
              <Main
                step={step}
                role={role}
                id={id!}
                offer={offer}
                setPayMethod={setPayMethod}
                activePayMethod={payMethod}
              />
            </div>
          )}
        </Form>

        <Chat />

        <FormNav>
          <div className={"flex items-center justify-between w-full"}>
            <div>
              <Button
                onAction={() => setStep(step + 1)}
                name={"Done, next!"}
                fWeight={"bold"}
                fSize={"lg"}
                color={"purple"}
                rounded={"15px"}
                tColor={"white"}
              />
            </div>

            <div>
              <Button
                onAction={() => {}}
                name={"Cancel"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"purple"}
              />
              <Button
                onAction={() => {}}
                name={"Appeal"}
                fWeight={"bold"}
                fSize={"lg"}
                tColor={"purple"}
              />
            </div>
          </div>
        </FormNav>
      </div>
    </div>
  );
};
