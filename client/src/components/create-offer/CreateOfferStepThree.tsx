import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Input } from './Input'
import { useActions } from '../../hooks/useActions'
import { TextArea } from './TextArea'
import { TimeLimit } from './TimeLimit'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { Wrapper } from './Wrapper'
import { Label } from '../ui/Label'
import contractConfig from '../../abis/contractConfig'
import { useCreateRoom } from '../../hooks/useCreateRoom'

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

  const { data, handleCreateOffer, isSuccess, isLoading, hash, prepareTxStatus, txStatus } =
    useCreateRoom()

  console.log(txStatus)

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
              name="Create"
            />
          </div>
        </Wrapper>
      </div>
    </form>
  )
}
