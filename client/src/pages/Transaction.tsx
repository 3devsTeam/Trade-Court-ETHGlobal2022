import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OfferService } from "../services/offer.services";
import { Form } from "../components/create-offer/Form";
import { FormNav } from "../components/create-offer/FormNav";
import { Chat } from "../components/transaction/Chat";
import transfer from "../assets/images/transfer.svg";
import lock from "../assets/images/lock.svg";
import success from "../assets/images/success.svg";
import { ProgressBar } from "../components/transaction/ProgressBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "../components/create-offer/Button";
import { Info } from "../components/transaction/Info";
import { io } from "socket.io-client";
import { Main } from "../components/transaction/Main";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URl } from "../services/axios";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

export const Transaction = () => {
  const { address } = useAccount();

  const {
    data: ensName,
    isLoading: ensNameLoading,
    isSuccess: ensNameSuccess,
  } = useEnsName({
    address,
  });

  const {
    data: ensAvatar,
    isLoading: ensAvatarLoading,
    isSuccess: ensAvatarSuccess,
  } = useEnsAvatar({
    addressOrName: address,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const txNotify = (message: string, type: string) => {
    if (type === "error") {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (type === "success") {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const {
    data: offer,
    isLoading,
    isSuccess,
  } = useQuery(["get offer by id"], () => OfferService.getByID(id!), {
    select: (data) => data.data.data.offer,
    onSuccess: (data) => {
      //console.log(data);
      setRole(data.role);
      setPayMethod(data.payMethods[0]);

      joinRoom({
        id,
        role: data.role,
        addressOrName: ensName ? ensName : address,
        avatar: ensAvatar,
      });
      //console.log(data.room.stage);

      if (data.room.stage === "waiting taker") {
        console.log("switch taker send");
        setStep(1);
      }

      if (data.room.stage === "taker send") {
        console.log("switch taker send");
        setStep(2);
      }

      if (data.room.stage === "maker recieved") {
        console.log("switch maker recieved");
        setStep(3);
      }
    },
  });

  const socket = io("http://127.0.0.1:3030");

  //socket.emit("msg", "bruh");

  const joinRoom = (data: object) => {
    socket.emit("joinOffer", data);
  };

  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  // socket.on("setChat", (data) => {
  //   console.log("set chat from client", data);
  //   setName(data.addressOrName);
  //   setProfileImg(data.avatar);
  // });

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [payMethod, setPayMethod] = useState({});
  const [message, setMessage] = useState("");

  const sendMessage = (message: string) => {
    console.log("send from client", message);
    socket.emit("sendMessage", { message, room: id });
    setMessage("");
  };

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("messageRecieved", (data) => {
      console.log(data.message);
      setChatMessages(data);
      //setChatMessages([...chatMessages, data.message]);
    });
  }, [socket]);

  const takerConfirmed = async (id: string) => {
    try {
      axios
        .get(`${API_URl}/api/offer/${id}/send`, { withCredentials: true })
        .then((res) => {
          if (res.data.message === "success") {
            console.log("taker confirmed");
            socket.emit("takerConfirmed", id);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  socket.on("approvalStage", () => {
    setStep(2);
  });

  const makerConfirmed = (id: string) => {
    try {
      axios
        .get(`${API_URl}/api/offer/${id}/recieve`, { withCredentials: true })
        .then((res) => {
          if (res.data.message === "success") {
            console.log("maker confirmed");
            socket.emit("makerConfirmed", id);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  socket.on("successStage", () => {
    setStep(3);
  });

  return (
    <div>
      {/* it just to check role and step */}
      <div className={"absolute top-20"}>
        <h1>user role: {role}</h1>
        <h1>active step: {step}</h1>
        <h1>current stage: {offer?.room.stage}</h1>
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
        <Chat
          chatMessages={chatMessages}
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
          addressOrName={name}
          avatar={profileImg}
        />

        <FormNav>
          <div className={"flex items-center justify-between w-full"}>
            <div>
              {role === "taker" ? (
                step === 1 ? (
                  <Button
                    onAction={() => takerConfirmed(id!)}
                    name={"Done, next!"}
                    fWeight={"bold"}
                    fSize={"lg"}
                    color={"purple"}
                    rounded={"15px"}
                    tColor={"white"}
                  />
                ) : step === 2 ? (
                  <span>Waiting for confirmation...</span>
                ) : (
                  <Button
                    onAction={() => alert("ураррарарар бляьб")}
                    name={"Claim"}
                    fWeight={"bold"}
                    fSize={"lg"}
                    color={"purple"}
                    rounded={"15px"}
                    tColor={"white"}
                  />
                )
              ) : step === 1 ? (
                <Button
                  disabled={true}
                  onAction={() => {}}
                  name={"Funds recieved"}
                  fWeight={"bold"}
                  fSize={"lg"}
                  color={"purple"}
                  rounded={"15px"}
                  tColor={"white"}
                />
              ) : step === 2 ? (
                <Button
                  onAction={() => makerConfirmed(id!)}
                  name={"Funds recieved"}
                  fWeight={"bold"}
                  fSize={"lg"}
                  color={"purple"}
                  rounded={"15px"}
                  tColor={"white"}
                />
              ) : step === 3 ? (
                <Button
                  onAction={() => navigate("/")}
                  name={"Go to main page"}
                  fWeight={"bold"}
                  fSize={"lg"}
                  color={"purple"}
                  rounded={"15px"}
                  tColor={"white"}
                />
              ) : null}
            </div>
          </div>
        </FormNav>
      </div>
    </div>
  );
};
