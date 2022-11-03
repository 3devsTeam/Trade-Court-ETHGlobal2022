import React from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Input } from '../Input'
import { Dropdown } from '../Dropdown'
import { Arrow } from '../../ui/icons/Arrow'
import { useActions } from '../../../hooks/useActions'
import { TextArea } from '../TextArea'
import { TimeLimit } from '../TimeLimit'
import { Button } from '../../ui/Button'
import { SubmitButton } from '../../ui/SubmitButton'
import { totalAmount } from '../../../utils/totalAmount'
import { Wrapper } from '../Wrapper'
import { Label } from '../../ui/Label'

interface Props {
  handleCreateOffer: () => void
}

export const CreateOfferStepThree = ({ handleCreateOffer }: Props) => {
  const { setMinPriceLimit, setMaxPriceLimit, setTimeLimit, setComment, prevStep } = useActions()
  const { fiat, offerComment, minLimit, maxLimit, quantity, unitPrice } = useTypedSelector(
    (state) => state.offerReducer
  )
  const { ticker } = fiat

  const checkStep3 = () => {
    if (minLimit > 0 && maxLimit > 0 && minLimit < maxLimit) return false
    return true
  }

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
              maxValue={parseInt((quantity * unitPrice).toString())}
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
            <Button onClick={prevStep} name="Back" />
            <Button disabled={checkStep3()} onClick={handleCreateOffer} name="Create" />
          </div>
        </Wrapper>
      </div>
    </form>
  )
}
