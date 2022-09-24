import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IOffer } from "../../models/models";
import { SuccessPage } from "./SuccessPage";
import { WarningMessage } from "./WarningMessage";

interface IMain {
  amount: number;
  ticker: string;
  id: string;
  step: number;
  role: string;
  offer: IOffer;
  activePayMethod: any;
  setPayMethod: any;
}

export const Main = ({
  ticker,
  amount,
  id,
  step,
  role,
  offer,
  setPayMethod,
  activePayMethod,
}: IMain) => {
  const renderByRole = () => {
    switch (role) {
      case "taker":
        switch (step) {
          case 1:
            return (
              <div>
                <div className={"flex items-center gap-4 mt-[15px]"}>
                  {offer?.payMethods?.map((p: any) => {
                    //console.log(p);
                    return (
                      <div
                        onClick={() => setPayMethod(p)}
                        key={p._id}
                        className={`${
                          activePayMethod?.bank?._id === p.bank._id
                            ? "border-purple scale-105 border-[3px] transition-transform duration-300"
                            : ""
                        } cursor-pointer px-[10px] py-[15px] h-[60px] rounded-[25px] border-2 border-gray flex gap-1 items-center min-w-[180px] bg-white`}
                      >
                        <img
                          className={`w-8 h-8 rounded-[50%] border-2 ${
                            activePayMethod?.bank?._id === p.bank._id
                              ? "border-purple"
                              : "border-none"
                          } object-cover`}
                          src={p.bank.logoUrl}
                          alt={""}
                        />
                        <div>
                          <p className={"font-bold"}>{p.bank.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={"flex flex-col gap-[10px] mt-[15px]"}>
                  <div>
                    <p className={"text-sm text-gray font-medium"}>Bank</p>
                    <p className={"font-bold"}>{activePayMethod?.bank?.name}</p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>Region</p>
                    <p className={"font-bold"}>
                      {activePayMethod?.region?.name}
                    </p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>
                      Card number
                    </p>
                    <p className={"font-bold"}>{activePayMethod?.cardNumber}</p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>
                      Payment Description
                    </p>
                    <p>
                      {activePayMethod.paymentDescription
                        ? activePayMethod.paymentDescription
                        : "-"}
                    </p>
                  </div>

                  <WarningMessage />

                  <div>
                    <div className={"flex gap-5"}>
                      <p className={"text-sm text-gray font-medium"}>
                        Created time
                      </p>
                      <p className={"text-sm font-bold"}>хз</p>
                    </div>

                    <div className={"flex gap-5"}>
                      <p className={"text-sm text-gray font-medium"}>
                        Order number:
                      </p>
                      <p className={"text-sm font-bold"}>{id}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 2:
            return (
              <div>
                <div className={"flex items-center gap-4 mt-[15px]"}>
                  {offer?.payMethods?.map((p: any) => {
                    //console.log(p);
                    return (
                      <div
                        onClick={() => setPayMethod(p)}
                        key={p._id}
                        className={`${
                          activePayMethod?.bank?._id === p.bank._id
                            ? "border-purple scale-105 border-[3px] transition-transform duration-300"
                            : ""
                        } cursor-pointer px-[10px] py-[15px] h-[60px] rounded-[25px] border-2 border-gray flex gap-1 items-center min-w-[180px] bg-white`}
                      >
                        <img
                          className={`w-8 h-8 rounded-[50%] border-2 ${
                            activePayMethod?.bank?._id === p.bank._id
                              ? "border-purple"
                              : "border-none"
                          } object-cover`}
                          src={p.bank.logoUrl}
                          alt={""}
                        />
                        <div>
                          <p className={"font-bold"}>{p.bank.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={"flex flex-col gap-[10px] mt-[15px]"}>
                  <div>
                    <p className={"text-sm text-gray font-medium"}>Bank</p>
                    <p className={"font-bold"}>{activePayMethod?.bank?.name}</p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>Region</p>
                    <p className={"font-bold"}>
                      {activePayMethod?.region?.name}
                    </p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>
                      Card number
                    </p>
                    <p className={"font-bold"}>{activePayMethod?.cardNumber}</p>
                  </div>

                  <div>
                    <p className={"text-sm text-gray font-medium"}>
                      Payment Description
                    </p>
                    <p>
                      {activePayMethod.paymentDescription
                        ? activePayMethod.paymentDescription
                        : "-"}
                    </p>
                  </div>

                  <WarningMessage />

                  <div>
                    <div className={"flex gap-5"}>
                      <p className={"text-sm text-gray font-medium"}>
                        Created time
                      </p>
                      <p className={"text-sm font-bold"}>хз</p>
                    </div>

                    <div className={"flex gap-5"}>
                      <p className={"text-sm text-gray font-medium"}>
                        Order number:
                      </p>
                      <p className={"text-sm font-bold"}>{id}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 3:
            return <SuccessPage id={id} />;
        }

      case "maker":
        switch (step) {
          case 1:
            return (
              <div className={"h-[480px] flex items-center justify-center"}>
                <div>
                  <h1 className={"text-lg font-bold"}>
                    Waiting for other user make his transfer
                  </h1>
                </div>
              </div>
            );
          case 2:
            return (
              <div className={"h-[400px] flex justify-center items-center"}>
                <div className={"text-center font-bold text-lg"}>
                  <p>Transfer confirmed</p>
                  <p>Please, check if funds are recieved</p>

                  <p className={"mt-[20px]"}>
                    You should recieve:{" "}
                    <span className={"font-bold text-purple"}>
                      {amount} {ticker}
                    </span>
                  </p>
                </div>
              </div>
            );
          case 3:
            return <SuccessPage id={id} />;
        }

      default:
        return <div>.</div>;
    }
  };

  return <div>{renderByRole()}</div>;
};
