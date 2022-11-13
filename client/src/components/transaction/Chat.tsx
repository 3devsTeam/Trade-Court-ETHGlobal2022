import React from 'react'
import telegram from '../../assets/images/message.svg'
import defaultProfilePic from '../../assets/images/ava.svg'
import { Gram } from '../ui/icons/Gram'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '../../utils/truncateAddress'

interface IChat {
  sendMessage: any
  setMessage: any
  message: any
  addressOrName: string
  avatar: string
  chatMessages: any
}

export const Chat = ({
  chatMessages,
  addressOrName,
  avatar,
  message,
  setMessage,
  sendMessage
}: IChat) => {
  //console.log(chatMessages);

  // console.log(avatar);

  // const {
  //   data: chatName,
  //   isError,
  //   isLoading,
  // } = useEnsName({
  //   address: "0x3c21AdC545aF820f9734eb67e504a845b897c4FF",
  // });

  //console.log("chat name", chatName);

  return (
    <div className={'bg-white rounded-[20px] relative shadow-customDark'}>
      <div className={'bg-purple rounded-t-[20px] h-[70px] px-[18px] flex items-center'}>
        <div className={'flex items-center gap-2'}>
          <img
            className={'rounded-[50%]'}
            src={avatar ? avatar : defaultProfilePic}
            width={55}
            height={55}
            alt={''}
          />
          <div className={'flex flex-col justify-start'}>
            <span className={'text-white font-bold'}>{truncateAddress(addressOrName)}</span>
            <span className={'text-white text-sm'}>online</span>
          </div>
        </div>
      </div>
      <div className={'h-52'}>
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
      <div className={'flex absolute bottom-0 items-center border-t-2 border-gray pr-5 w-full'}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          //value={message ? message : ""}
          className={'h-[70px] rounded-b-[20px] pl-5 w-full outline-none font-bold text-sm'}
          placeholder={'Type some message...'}
        />
        <button className={``} onClick={() => sendMessage(message)}>
          <Gram color={'purple'} />
        </button>
      </div>
    </div>
  )
}
