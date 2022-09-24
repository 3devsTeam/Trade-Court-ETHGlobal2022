import React from "react";
import telegram from "../../assets/images/message.svg";
import defaultProfilePic from "../../assets/images/profile_pic.png";
import { Gram } from "./Gram";

interface IChat {
  sendMessage: any;
  setMessage: any;
  message: any;
  addressOrName: string;
  avatar: string;
  chatMessages: any;
}

export const Chat = ({
  chatMessages,
  addressOrName,
  avatar,
  message,
  setMessage,
  sendMessage,
}: IChat) => {
  console.log(chatMessages);
  // console.log(addressOrName);
  // console.log(avatar);
  return (
    <div className={"bg-white shadow-lg rounded-[20px] relative"}>
      <div
        className={
          "bg-purple rounded-t-[20px] h-[70px] px-[18px] py-[12px] flex items-center"
        }
      >
        <img
          src={avatar ? avatar : defaultProfilePic}
          width={60}
          height={60}
          alt={""}
        />
        <span>{addressOrName}</span>
      </div>
      <div className={"border-4 border-purple"}>
        {chatMessages}
        {/* {chatMessages?.map((msg: any, i: number) => {
          console.log(msg);

          return <></>;

          // return (
          //   <div className={"text-black"} key={i}>
          //     {msg}
          //   </div>
          // );
        })} */}
      </div>
      <div
        className={
          "flex absolute bottom-0 items-center border-t-2 border-gray pr-5 w-full"
        }
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          //value={message ? message : ""}
          className={
            "h-[70px] rounded-b-[20px] pl-5 w-full outline-none font-bold text-sm"
          }
          placeholder={"Type some message..."}
        />
        <button className={``} onClick={() => sendMessage(message)}>
          <Gram color={"purple"} />
        </button>
      </div>
    </div>
  );
};
