import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Input } from './Input'
import { Dropdown } from './Dropdown'
import { Arrow } from '../ui/icons/Arrow'
import { useActions } from '../../hooks/useActions'
import { TextArea } from './TextArea'
import { TimeLimit } from './TimeLimit'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { SubmitButton } from '../ui/SubmitButton'
import { Wrapper } from './Wrapper'
import { Label } from '../ui/Label'
import { useCreateRoom } from '../../hooks/useCreateRoom'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { sha256 } from 'js-sha256'
import { BigNumber, ethers } from 'ethers'
import { OfferService } from '../../api/offer.services'
import { IPayment } from '../../types/interfaces/payment.interface'
import { toast } from 'react-toastify'
import contractConfig from '../../abis/contractConfig'

export const CreateOfferStepThree = () => {
  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment, prevStep } = useActions()
  const {
    fiat,
    offerComment,
    minLimit,
    maxLimit,
    quantity,
    unitPrice,
    payMethods,
    timeLimit,
    crypto
  } = useTypedSelector((state) => state.createOfferReducer)
  const { ticker } = fiat

  const checkStep3 = () => {
    if (minLimit > 0 && maxLimit > 0 && minLimit < maxLimit && maxLimit <= quantity * unitPrice)
      return false
    return true
  }

  // const { createOffer, isSuccess, isError, isLoading, prepareError, handleCreateOffer } =
  //   useCreateRoom()

  // console.log(prepareError)

  const { address } = useAccount()

  // const {
  //   quantity,
  //   unitPrice,
  //   timeLimit,
  //   minLimit,
  //   maxLimit,
  //   crypto,
  //   fiat,
  //   offerComment,
  //   payMethods
  // } = useTypedSelector((state) => state.createOfferReducer)

  const navigate = useNavigate()

  const { resetOffer } = useActions()

  const roomId = BigNumber.from('0x' + sha256(Date.now().toString() + address))

  const handleCreateOffer = async () => {
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
        toast.success('Offer is created', {
          position: toast.POSITION.BOTTOM_RIGHT
        })

        navigate('/')
        resetOffer()
      })
      .catch((error) =>
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      )
  }

  const { config, error: prepareError } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createRoom',
    args: [
      ethers.utils.parseEther(quantity.toString()),
      quantity,
      roomId,
      +timeLimit * 60,
      maxLimit,
      minLimit,
      unitPrice
    ],
    overrides: {
      // gasLimit: 400000
    }
  })

  const { data, isError, writeAsync: createOffer } = useContractWrite(config)

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash
  })

  return (
    <form>
      <Wrapper>
        <div className="flex flex-col gap-5">
          <TimeLimit
            onAction={setTimeLimit}
            label={'Order Time Limit'}
            times={['15', '30', '45', '60', '120']}
          />

          <Label label={'Order Price Limit'} />
          <div className={'flex justify-between gap-1'}>
            <Input
              value={minLimit}
              onAction={setMinPriceLimit}
              placeholder={'Min'}
              element={ticker}
            />
            <Input
              value={maxLimit}
              maxValue={quantity * unitPrice}
              onAction={setMaxPriceLimit}
              placeholder={'Max'}
              element={ticker}
            />
          </div>

          <TextArea
            value={offerComment ? offerComment : ''}
            onAction={setComment}
            label={'Comment'}
            placeholder={'Enter comment'}
          />
        </div>
      </Wrapper>

      <div className="mt-5">
        <Wrapper>
          <div className="flex gap-5">
            <ButtonDisabled onClick={prevStep} name="Back" />
            <ButtonDisabled
              disabled={checkStep3()}
              onClick={() => handleCreateOffer()}
              // createOffer?.().then(() => console.log('create offer'))
              name="Create"
            />
          </div>
        </Wrapper>
      </div>
    </form>
  )
}
