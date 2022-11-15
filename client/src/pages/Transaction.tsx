import { useParams } from 'react-router-dom'
import { useAccount, useQuery } from 'wagmi'
import { OfferService } from '../api/offer.services'
import { ProgressBar } from '../components/create-offer/Progressbar'
import { Chat } from '../components/transaction/Chat'
import { ConfirmsMaker } from '../components/transaction/ConfirmsMaker'
import { ConfirmsTaker } from '../components/transaction/ConfirmsTaker'
import { Time } from '../components/transaction/Time'
import { TransactionInfo } from '../components/transaction/TransactionInfo'
import { TransactionMaker } from '../components/transaction/TransactionMaker'
import { TransactionTaker } from '../components/transaction/TransactionTaker'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { TRANSACTION_ROLES } from '../types/interfaces/roles.enum'
import Confetti from 'react-confetti'
import { io } from 'socket.io-client'
import { useTakerApprove } from '../hooks/useTakerApprove'
import { useMakerApprove } from '../hooks/useMakerApprove'
import { useTakerWithdraw } from '../hooks/useTakerWithdraw'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const TransactionPage = () => {
  const socket = io('http://127.0.0.1:3030')

  socket.on('approvalStage', () => {
    setStep(2)
  })

  socket.on('successStage', () => {
    setStep(3)
  })

  const { id } = useParams()

  const { address } = useAccount()

  const { setSelectedPayment, setRole, setStep } = useActions()
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const { data, isLoading, isSuccess, isError } = useQuery(
    ['get offer by id'],
    () => OfferService.getByID(id!),
    {
      select: ({ data }) => data.data.room,
      onSuccess: (data) => {
        setRole(data.role)
        joinRoom({ id, role })
        setStep(
          data.stage === 'waiting taker'
            ? 1
            : data.stage === 'taker send'
            ? 2
            : data.stage === 'maker recieved'
            ? 3
            : null
        )
        setSelectedPayment(data.offer.payMethods[0])
      }
    }
  )

  const {
    data: takerApproveTxData,
    takerApprove,
    prepareTxStatus,
    contractTxStatus
  } = useTakerApprove(data?.offer.roomId, data?.takerNumber)

  const {
    data: makerApproveTxData,
    makerApprove,
    makerContractTxStatus,
    makerPrepareTxStatus
  } = useMakerApprove(data?.offer.roomId, data?.takerNumber)

  const {
    takerWithdraw,
    takerWithdrawPrepareTxStatus,
    takerWithdrawTxData,
    takerWithdrawTxStatus
  } = useTakerWithdraw(data?.offer.roomId, data?.takerNumber)

  const joinRoom = (data: object) => {
    socket.emit('joinOffer', data)
  }

  const takerTransfered = async () => {
    await takerApprove?.()
    await OfferService.takerSend(id!)
    socket.emit('takerConfirmed', id)
  }

  const makerConfirmed = async () => {
    await makerApprove?.()
    await OfferService.makerRecieved(id!)
    socket.emit('makerConfirmed', id)
  }

  const takerClaim = async () => {
    await takerWithdraw?.()
    await OfferService.claimByID(id!)
  }

  return isSuccess ? (
    <>
      <TransactionInfo offer={data?.offer} />

      <div className="grid grid-cols-form gap-5 mt-5">
        <div>
          <div className="wrapper p-5">
            <ErrorBoundary fallback={<h1>error</h1>}>
              {role === TRANSACTION_ROLES.taker ? <TransactionTaker offer={data.offer} /> : null}
              {role === TRANSACTION_ROLES.maker ? <TransactionMaker offer={data.offer} /> : null}
              <Time id={data._id} time={data.createdAt} />
            </ErrorBoundary>
          </div>

          <div className="wrapper p-5 mt-5">
            <ErrorBoundary fallback={<h1>error</h1>}>
              {role === TRANSACTION_ROLES.taker ? (
                <ConfirmsTaker takerConfirmed={takerTransfered} takerClaim={takerClaim} />
              ) : null}
              {role === TRANSACTION_ROLES.maker ? (
                <ConfirmsMaker makerConfirmed={makerConfirmed} />
              ) : null}
            </ErrorBoundary>
          </div>
        </div>
        <ErrorBoundary fallback={<h1>error</h1>}>
          <Chat
            sendMessage={() => {}}
            setMessage={() => {}}
            message={''}
            addressOrName={address!}
            avatar={''}
            chatMessages={[]}
          />
        </ErrorBoundary>
      </div>
    </>
  ) : isLoading ? (
    <h1>loading...</h1>
  ) : isError ? (
    <h1>error</h1>
  ) : null
}

export default TransactionPage
