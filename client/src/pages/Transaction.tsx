import { useParams } from 'react-router-dom'
import { useAccount, useQuery } from 'wagmi'
import { OfferService } from '../api/offer.services'
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

const socket = io('http://127.0.0.1:3030')

const TransactionPage = () => {
  //console.log(socket)

  socket.on('approvalStage', () => {
    setStep(2)
  })

  socket.on('successStage', () => {
    setStep(3)
  })

  socket.on('show_alert', () => alert('alo'))

  const { id } = useParams()

  const { setSelectedPayment, setRole, setStep, setRoom } = useActions()
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const { data, isLoading, isSuccess, isError } = useQuery(
    ['get offer by id'],
    () => OfferService.getByID(id!),
    {
      select: ({ data }) => data.data.room,
      onSuccess: (data) => {
        setRole(data.role)
        setRoom(id)
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

  const joinRoom = (data: object) => {
    socket.emit('joinOffer', data)
  }

  const { takerTransfered } = useTakerApprove(data?.offer.roomId, data?.takerNumber, id!, socket)

  const { makerConfirmed } = useMakerApprove(data?.offer.roomId, data?.takerNumber, id!, socket)

  const { takerClaim } = useTakerWithdraw(data?.offer.roomId, data?.takerNumber, id!, socket)

  return isSuccess ? (
    <div className="grid grid-rows-[10%_90%] h-full">
      <TransactionInfo offer={data?.offer} />

      <div className="grid grid-cols-2 gap-5 h-full mt-5">
        <div className="grid grid-rows-[90%_10%] gap-y-5">
          <div className="wrapper">
            <ErrorBoundary fallback={<h1>error</h1>}>
              <div className="flex flex-col justify-between mb-5 p-5 h-full">
                {role === TRANSACTION_ROLES.taker ? <TransactionTaker offer={data.offer} /> : null}
                {role === TRANSACTION_ROLES.maker ? <TransactionMaker offer={data.offer} /> : null}
                <Time id={data._id} time={data.createdAt} />
              </div>
            </ErrorBoundary>
          </div>
          <div className="flex items-center">
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
          <Chat offer={data} socket={socket} />
        </ErrorBoundary>
      </div>
    </div>
  ) : isLoading ? (
    <h1>loading...</h1>
  ) : isError ? (
    <h1>error</h1>
  ) : null
}

export default TransactionPage
