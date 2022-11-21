import { useParams } from 'react-router-dom'
import { useQuery } from 'wagmi'
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
import { io } from 'socket.io-client'
import { useTakerApprove } from '../hooks/useTakerApprove'
import { useMakerApprove } from '../hooks/useMakerApprove'
import { useTakerWithdraw } from '../hooks/useTakerWithdraw'
import { ErrorBoundary } from 'react-error-boundary'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'

const socket = io(import.meta.env.VITE_SOCKET_URL)

const TransactionPage = () => {
  socket.on('approvalStage', () => {
    setStep(2)
  })

  socket.on('successStage', () => {
    setStep(3)
  })

  const { id } = useParams()

  const { setSelectedPayment, setRole, setStep, setRoom } = useActions()
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const { data, status } = useQuery(['get offer by id'], () => OfferService.getByID(id!), {
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
  })

  const joinRoom = (data: object) => {
    socket.emit('join_room', data)
  }

  const { takerTransfered } = useTakerApprove(data?.offer.roomId, data?.takerNumber, id!, socket)

  const { makerConfirmed } = useMakerApprove(data?.offer.roomId, data?.takerNumber, id!, socket)

  const { takerClaim } = useTakerWithdraw(data?.offer.roomId, data?.takerNumber, id!, socket)

  return status === 'success' ? (
    <div className="grid grid-rows-[10%_90%] h-full">
      <SkeletonWrapper isLoaded={status === 'success'} height={60}>
        <TransactionInfo offer={data?.offer} />
      </SkeletonWrapper>

      <div className="grid grid-cols-2 gap-5 h-full mt-5">
        <SkeletonWrapper isLoaded={status === 'success'} height={600}>
          <div className="grid grid-rows-[90%_10%] gap-y-5">
            <div className="wrapper">
              <ErrorBoundary fallback={<h1>error</h1>}>
                <div className="flex flex-col justify-between p-5 h-full">
                  {role === TRANSACTION_ROLES.taker ? (
                    <TransactionTaker offer={data.offer} />
                  ) : null}
                  {role === TRANSACTION_ROLES.maker ? (
                    <TransactionMaker offer={data.offer} />
                  ) : null}
                  <Time id={data._id} time={data.createdAt} />
                </div>
              </ErrorBoundary>
            </div>

            <div className="flex items-center wrapper px-5">
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
        </SkeletonWrapper>

        <SkeletonWrapper isLoaded={status === 'success'} height={600}>
          <ErrorBoundary fallback={<h1>error</h1>}>
            <Chat offer={data} socket={socket} />
          </ErrorBoundary>
        </SkeletonWrapper>
      </div>
    </div>
  ) : status === 'loading' ? (
    <h1>loading...</h1>
  ) : status === 'error' ? (
    <h1>error</h1>
  ) : null
}

export default TransactionPage
