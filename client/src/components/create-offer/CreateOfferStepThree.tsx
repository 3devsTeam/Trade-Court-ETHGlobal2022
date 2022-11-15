import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { NumericalInput } from './NumericalInput'
import { useActions } from '../../hooks/useActions'
import { TextArea } from './TextArea'
import { TimeLimit } from './TimeLimit'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { Wrapper } from './Wrapper'
import { Label } from '../ui/Label'

interface Props {
  handleCreateOffer: () => Promise<void>
}

export const CreateOfferStepThree: React.FC<Props> = ({ handleCreateOffer }) => {
  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment, prevStep } = useActions()
  const { fiat, offerComment, minLimit, maxLimit, quantity, unitPrice } = useTypedSelector(
    (state) => state.createOfferReducer
  )
  const { ticker } = fiat

  const checkStep3 = () => {
    if (
      +minLimit > 0 &&
      +maxLimit > 0 &&
      +minLimit < +maxLimit &&
      +maxLimit <= +quantity * +unitPrice
    )
      return false
    return true
  }

  return (
    <>
      <Wrapper>
        <TimeLimit
          onAction={setTimeLimit}
          label={'Order Time Limit'}
          times={['15', '30', '45', '60', '120']}
        />

        <Label label={'Order Price Limit'} />
        <div className={'flex justify-between gap-1'}>
          <NumericalInput
            value={minLimit}
            onUserInput={setMinPriceLimit}
            placeholder={'Min'}
            element={ticker}
          />
          <NumericalInput
            value={maxLimit}
            maxValue={(+quantity * +unitPrice).toString()}
            onUserInput={setMaxPriceLimit}
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
    </>
  )
}
