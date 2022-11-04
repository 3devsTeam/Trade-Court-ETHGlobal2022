import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Input } from './Input'
import { Dropdown } from './Dropdown'
import { useActions } from '../../hooks/useActions'
import { useScrollTop } from '../../hooks/useScrollTop'
import { TextArea } from './TextArea'
import { Payment } from './Payment'
import { Wrapper } from './Wrapper'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '../ui/SubmitButton'
import { Button } from '../ui/ButtonDisabled'
import { v4 as uuidv4 } from 'uuid'
import { Label } from '../ui/Label'
import { IPayment } from '../../types/interfaces/payment.interface'

export const CreateOfferStepTwo = () => {
  const {
    addPaymentMethod,
    setRegion,
    setBank,
    prevStep,
    nextStep,
    updatePaymentMethod,
    removePaymentMethod
  } = useActions()
  const { fiat, region, paymentMethod, payMethods } = useTypedSelector(
    (state) => state.offerReducer
  )

  const [paymentDescription, setPaymentDescription] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const addPayment = () => {
    const newPayment: IPayment = {
      id: uuidv4(),
      paymentMethod,
      region,
      cardNumber,
      paymentDescription
    }
    addPaymentMethod(newPayment)
    setPaymentDescription('')
    setCardNumber('')
  }

  const deletePayment = (id: string) => {
    removePaymentMethod(id)
    setBank(fiat.banks[0])
    setRegion(fiat.regions[0])
    setCardNumber('')
    setPaymentDescription('')
  }

  const { banks, regions } = fiat

  const paymentName = paymentMethod?.name
  const paymentLogoUrl = paymentMethod?.logoUrl

  const regionName = region?.name
  const regionLogoUrl = region?.logoUrl

  const [active, setActive] = useState<IPayment | null>(null)

  const editPayment = () => {
    updatePaymentMethod({
      id: active?.id!,
      paymentMethod,
      region,
      cardNumber,
      paymentDescription
    })

    setCardNumber('')
    setPaymentDescription('')
    setActive(null)
  }

  useEffect(() => {
    if (active != null) {
      setBank(active?.paymentMethod)
      setRegion(active?.region)
      setCardNumber(active?.cardNumber)
      setPaymentDescription(active.paymentDescription)
    }
  }, [active])

  return (
    <form>
      <Wrapper>
        <div className="flex flex-col gap-5">
          {payMethods.length ? (
            <div>
              <Label label={'Payment Methods'} />
              <div className={'flex flex-col gap-3'}>
                {payMethods.map((p) => {
                  return (
                    <Payment
                      deletePayment={deletePayment}
                      setActive={setActive}
                      key={p.id}
                      payment={p}
                    />
                  )
                })}
              </div>
            </div>
          ) : null}

          <div>
            <Label label={'Add Payment Method'} />
            <div className={'flex items-center gap-1'}>
              <Dropdown
                image={paymentLogoUrl}
                value={paymentName}
                data={banks}
                onAction={setBank}
              />
              <Dropdown
                image={regionLogoUrl}
                value={regionName}
                data={regions}
                onAction={setRegion}
              />
            </div>
          </div>

          <Input
            value={cardNumber!}
            label={'Card Number'}
            placeholder={'Enter card number'}
            onAction={setCardNumber}
          />
          <TextArea
            value={paymentDescription}
            onAction={setPaymentDescription}
            label={'Payment Description'}
            placeholder={'Here can be written something useful...'}
          />
          <Button
            name={payMethods.length === 5 ? 'Maximum' : active != null ? 'Save' : 'Add'}
            onClick={active != null ? editPayment : addPayment}
            disabled={!(payMethods.length < 5)}
          />
        </div>
      </Wrapper>

      <div className="mt-5">
        <Wrapper>
          <div className="flex gap-5">
            <Button onClick={prevStep} disabled={false} name={'Back'} />
            <Button onClick={nextStep} disabled={!(payMethods.length > 0)} name={'Next'} />
          </div>
        </Wrapper>
      </div>
    </form>
  )
}
