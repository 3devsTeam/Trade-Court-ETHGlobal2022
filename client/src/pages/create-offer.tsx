import { Form } from '../components/create-offer/Form'
import { Preview } from '../components/create-offer/Preview'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CreateOfferStepOne } from '../components/create-offer/CreateOfferStepOne'
import { CreateOfferStepTwo } from '../components/create-offer/CreateOfferStepTwo'
import { CreateOfferStepThree } from '../components/create-offer/CreateOfferStepThree'
import { useActions } from '../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { OfferService } from '../api/offer.services'
import { multiply } from '../utils/multiply'
import { toast } from 'react-toastify'
import { useEthContractWithValue } from '../hooks/useEthContractWithValue'
import { BigNumber, ethers } from 'ethers'
import { randomNumber } from '../utils/randomNumber'
import { convertToSeconds } from '../utils/convertToSeconds'
import React, { useEffect, useState } from 'react'
import { useTokens } from '../hooks/useTokens'
import { useQuery } from 'wagmi'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { ErrorBoundary } from 'react-error-boundary'
import { FiatServices } from '../api/fiat.services'
import { useFiat } from '../hooks/useFiat'
import { IPayment } from '../types/interfaces/payment.interface'
import { ProgressBar } from '../components/create-offer/ProgressBar'
const CreateOfferPage = () => {
  const { resetOffer } = useActions()

  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    minLimit,
    maxLimit,
    offerComment,
    payMethods,
    timeLimit,
    step
  } = useTypedSelector((state) => state.createOfferReducer)

  const { tokens, isSuccess: tokensSuccess } = useTokens()
  const { allFiat, isSuccess: fiatSuccess } = useFiat()

  const isLoaded = tokensSuccess && fiatSuccess

  const limitPrice = (value: number, unitPrice: number) => {
    if (!BigNumber.from(value).eq(BigNumber.from(0))) {
      return ethers.utils.parseEther(value.toString()).div(BigNumber.from(unitPrice))
    } else {
      return ethers.utils.parseEther('0')
    }
  }

  const roomId = 10

  const args = [
    roomId, // рандомная комната
    convertToSeconds(timeLimit), // время апрува
    convertToSeconds(timeLimit), // время апрува
    limitPrice(minLimit, unitPrice), // фиатный максимальный лимит
    limitPrice(maxLimit, unitPrice) // фиатный минимальный лимит
  ]

  const value = ethers.utils.parseEther(String(quantity) === '' ? '0' : quantity.toString())

  // const {
  //   data,
  //   isError,
  //   isLoading,
  //   isSuccess: isSuccessMakeRoom,
  //   writeAsync,
  //   hash
  // } = useEthContractWithValue(args, value, 'makeRoomEth')

  const navigate = useNavigate()

  const successOfferNotify = (info: React.ReactNode) => {
    toast.success(info, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  const errorOfferNotify = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  const handleCreateOffer = async () => {
    // writeAsync?.()
    //   .then(() => {
    OfferService.create({
      offerType: 'buy',
      payMethods: payMethods.map((payment: IPayment) => {
        const { bank, cardNumber, region, paymentDescription } = payment

        return {
          bank,
          cardNumber,
          region,
          paymentDescription
        }
      }),
      fiat: fiat._id,
      roomId,
      unitPrice,
      amount: unitPrice * quantity,
      quantity,
      minLimit,
      maxLimit,
      crypto: crypto._id,
      offerComment
    })
      .then(() => {
        // successOfferNotify(
        //   <div>
        //     <p>Offer is created!</p>
        //     <a
        //       target={'_blank'}
        //       className={'text-purple'}
        //       href={`https://rinkeby.etherscan.io/tx/${hash?.transactionHash}`}>
        //       View your transaction on Etherscan
        //     </a>
        //   </div>
        // )
        navigate('/')
        resetOffer()
      })
      .catch((error) => console.log(error))
    // errorOfferNotify(data.response.data.message)
  }

  const steps = [
    {
      step: 1,
      name: 'Offer Price'
    },
    {
      step: 2,
      name: 'Payment Method'
    },
    {
      step: 3,
      name: 'Settings'
    }
  ]

  const pageDisplay = () => {
    switch (step) {
      case 1:
        return <CreateOfferStepOne tokens={tokens} allFiat={allFiat} />
      case 2:
        return <CreateOfferStepTwo />
      case 3:
        return <CreateOfferStepThree handleCreateOffer={handleCreateOffer} />
      default:
        return
    }
  }

  return (
    <div className="p-5">
      {/* <SkeletonWrapper isLoading={isLoaded} height={100}> */}
      <ProgressBar steps={steps} />
      {/* </SkeletonWrapper> */}

      <div className={'grid grid-cols-2 gap-5 mt-5'}>
        <div className="flex flex-col justify-between">
          {/* <SkeletonWrapper isLoading={isLoaded} height={600}> */}
          {pageDisplay()}
          {/* </SkeletonWrapper> */}
        </div>

        <div>
          {/* <SkeletonWrapper isLoading={isLoaded} height={600}> */}
          <Preview />
          {/* </SkeletonWrapper> */}
        </div>
      </div>
    </div>
  )
}

export default CreateOfferPage
