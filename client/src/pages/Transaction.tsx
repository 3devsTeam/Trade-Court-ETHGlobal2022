import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OfferService } from '../api/offer.services'
import { Form } from '../components/create-offer/Form'
import { Chat } from '../components/transaction/Chat'
import transfer from '../assets/images/transfer.svg'
import lock from '../assets/images/lock.svg'
import success from '../assets/images/success.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from '../components/ui/ButtonDisabled'
import { Info } from '../components/transaction/Info'
import { io } from 'socket.io-client'
import { Main } from '../components/transaction/Main'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API_URl } from '../api/axios'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { useEthContract } from '../hooks/useEthContract'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { Wrapper } from '../components/create-offer/Wrapper'

const Transaction = () => {
  const { address } = useAccount()

  // const {
  //   data: ensName,
  //   isLoading: ensNameLoading,
  //   isSuccess: ensNameSuccess,
  // } = useEnsName({
  //   address,
  // });

  // const {
  //   data: ensAvatar,
  //   isLoading: ensAvatarLoading,
  //   isSuccess: ensAvatarSuccess,
  // } = useEnsAvatar({
  //   addressOrName: address,
  // });

  const { id } = useParams()

  const navigate = useNavigate()

  const txNotify = (message: string, type: string) => {
    if (type === 'error') {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    if (type === 'success') {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const {
    data: offer,
    isLoading,
    isSuccess
  } = useQuery(['get offer by id'], () => OfferService.getByID(id!), {
    select: (data) => data.data.data.offer,
    onSuccess: (data) => {
      setRole(data.role)
      setPayMethod(data.payMethods[0])

      joinRoom({
        id,
        role: data.role
        //addressOrName: ensName ? ensName : address,
        //avatar: ensAvatar,
      })
      //console.log(data.room.stage);

      if (data.room.stage === 'waiting taker') {
        console.log('switch taker send')
        setStep(1)
      }

      if (data.room.stage === 'taker send') {
        console.log('switch taker send')
        setStep(2)
      }

      if (data.room.stage === 'maker recieved') {
        console.log('switch maker recieved')
        setStep(3)
      }
    }
  })

  useEffect(() => {
    if (role === 'taker') {
      setName(offer?.maker.address)
    } else {
      setName(offer?.room.taker.address)
    }
  }, [role])

  const roomId = offer?.room.roomId
  const amount = offer?.room.amount
  const ticker = offer?.fiat.ticker

  const {
    data: takerApproveData,
    isError: takerApproveError,
    isLoading: loadingTakerApprove,
    isSuccess: successTakerApprove,
    writeAsync: takerApproveContract,
    hash: takerApproveHash
  } = useEthContract([roomId, 0], 'dealDone')

  const {
    data: makerApproveData,
    isError: makerApproveError,
    isLoading: loadingMakerApprove,
    isSuccess: successMakerApprove,
    writeAsync: makerApproveContract,
    hash: makerApproveHash
  } = useEthContract([roomId, 0], 'approveFromSender')

  const {
    data: claimData,
    isError: claimError,
    isLoading: loadingClaim,
    isSuccess: successClaim,
    writeAsync: claimContract,
    hash: claimHash
  } = useEthContract([roomId, 0], 'finalWithdraw')

  const socket = io('http://127.0.0.1:3030')

  //socket.emit("msg", "bruh");

  const joinRoom = (data: object) => {
    socket.emit('joinOffer', data)
  }
  // const [profileImg, setProfileImg] = useState("");

  // socket.on("setChat", (data) => {
  //   console.log("set chat from client", data);
  //   setName(data.addressOrName);
  //   setProfileImg(data.avatar);
  // });

  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState({})
  const [message, setMessage] = useState('')

  const sendMessage = (message: string) => {
    console.log('send from client', message)
    socket.emit('sendMessage', { message, room: id })
    setMessage('')
  }

  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    socket.on('messageRecieved', (data) => {
      console.log(data.message)
      setChatMessages(data)
      //setChatMessages([...chatMessages, data.message]);
    })
  }, [socket])

  const takerConfirmed = async (id: string) => {
    try {
      takerApproveContract?.().then(() => {
        axios.get(`${API_URl}/api/offer/${id}/send`, { withCredentials: true }).then((res) => {
          if (res.data.message === 'success') {
            console.log('taker confirmed')
            socket.emit('takerConfirmed', id)
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  socket.on('approvalStage', () => {
    setStep(2)
  })

  const makerConfirmed = (id: string) => {
    try {
      makerApproveContract?.().then(() => {
        axios.get(`${API_URl}/api/offer/${id}/recieve`, { withCredentials: true }).then((res) => {
          if (res.data.message === 'success') {
            console.log('maker confirmed')
            socket.emit('makerConfirmed', id)
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const claimTokens = async (id: string) => {
    try {
      claimContract?.().then(() => {
        OfferService.claimByID(id!).then(() => navigate('/'))
      })
    } catch (err) {
      console.log(err)
    }
  }

  socket.on('successStage', () => {
    setStep(3)
  })

  return (
    <h1>transaction</h1>
    // <div>
    //   {/* it just to check role and step */}
    //   {/* <div className={"absolute bottom-0 right-0 z-50"}>
    //     <h1>user role: {role}</h1>
    //     <h1>active step: {step}</h1>
    //     <h1>current stage: {offer?.room.stage}</h1>
    //   </div> */}

    //   <SkeletonWrapper isLoaded={!isLoading} height={60}>
    //     <Info {...offer} />
    //   </SkeletonWrapper>

    //   <div className={'grid grid-cols-form gap-5 mt-[20px]'}>
    //     <SkeletonWrapper isLoaded={!isLoading} height={600}>
    //       <Wrapper>
    //         <ProgressBar
    //           activeStep={step}
    //           steps={['Transfer', 'Approval', 'Success']}
    //           images={[transfer, lock, success]}
    //         />
    //         <Main
    //           ticker={ticker}
    //           amount={amount}
    //           step={step}
    //           role={role}
    //           id={id!}
    //           offer={offer}
    //           setPayMethod={setPayMethod}
    //           activePayMethod={payMethod}
    //         />
    //       </Wrapper>
    //     </SkeletonWrapper>

    //     <SkeletonWrapper isLoaded={!isLoading} height={600}>
    //       <Chat
    //         chatMessages={chatMessages}
    //         sendMessage={sendMessage}
    //         message={message}
    //         setMessage={setMessage}
    //         addressOrName={name ? name : 'ya loh'}
    //         avatar={''}
    //       />
    //     </SkeletonWrapper>

    //     <SkeletonWrapper isLoaded={!isLoading} height={100}>
    //       <div className={'flex items-center justify-between w-full'}>
    //         <Wrapper>
    //           <div>
    //             {role === 'taker' ? (
    //               step === 1 ? (
    //                 <Button onAction={() => takerConfirmed(id!)} name={'Done, next!'} />
    //               ) : step === 2 ? (
    //                 <span className={'text-lg font-bold'}>Waiting for confirmation...</span>
    //               ) : (
    //                 <Button onAction={() => claimTokens(id!)} name={'Claim'} />
    //               )
    //             ) : step === 1 ? (
    //               <Button disabled={true} onAction={() => {}} name={'Funds recieved'} />
    //             ) : step === 2 ? (
    //               <Button onAction={() => makerConfirmed(id!)} name={'Funds recieved'} />
    //             ) : step === 3 ? (
    //               <Button onAction={() => navigate('/')} name={'Go to main page'} />
    //             ) : null}
    //           </div>
    //         </Wrapper>
    //       </div>
    //     </SkeletonWrapper>
    //   </div>
    // </div>
  )
}

export default Transaction
