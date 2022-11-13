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
import { useEffect } from 'react'

const TransactionPage = () => {
  const socket = io('http://127.0.0.1:3030')

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
        // setStep(
        //   data.stage === 'waiting taker'
        //     ? 1
        //     : data.stage === 'taker send'
        //     ? 2
        //     : data.stage === 'maker recieved'
        //     ? 3
        //     : null
        // )
        setSelectedPayment(data.offer.payMethods[0])
      }
    }
  )

  const joinRoom = (data: object) => {
    socket.emit('joinOffer', data)
  }

  socket.on('approvalStage', () => {
    setStep(2)
  })

  socket.on('successStage', () => {
    setStep(3)
  })

  const takerTransfered = async () => {
    socket.emit('takerConfirmed', id)
  }

  const makerConfirmed = async () => {
    socket.emit('makerConfirmed', id)
  }

  return isSuccess ? (
    <div>
      <TransactionInfo offer={data?.offer} />

      <div className="grid grid-cols-form gap-5 mt-5">
        <div className="">
          <div className="wrapper p-5">
            {role === TRANSACTION_ROLES.taker ? <TransactionTaker offer={data.offer} /> : null}
            {role === TRANSACTION_ROLES.maker ? <TransactionMaker offer={data.offer} /> : null}
            <Time id={data._id} time={data.createdAt} />
          </div>

          <div className="wrapper p-5 mt-5">
            {role === TRANSACTION_ROLES.taker ? (
              <ConfirmsTaker takerConfirmed={takerTransfered} />
            ) : null}
            {role === TRANSACTION_ROLES.maker ? (
              <ConfirmsMaker makerConfirmed={makerConfirmed} />
            ) : null}
          </div>
        </div>
        <Chat
          sendMessage={() => {}}
          setMessage={() => {}}
          message={''}
          addressOrName={address!}
          avatar={''}
          chatMessages={[]}
        />
      </div>
    </div>
  ) : null
}

export default TransactionPage
