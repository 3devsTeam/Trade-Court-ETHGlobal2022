import React, { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Input } from './Input'
import { Dropdown } from './Dropdown'
import { useActions } from '../../hooks/useActions'
import { ModalInput } from './ModalInput'
import { Modal } from '../ui/Modal'
import { SearchField } from '../ui/SearchField'
import { TokenList } from './TokenList'
import 'react-loading-skeleton/dist/skeleton.css'
import { Wrapper } from './Wrapper'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../ui/Button'
import { SubmitButton } from '../ui/SubmitButton'
import { ICrypto } from '../../types/interfaces/crypto.interface'
import { IFiat } from '../../types/interfaces/fiat.interface'

interface IStep1 {
  tokens: [ICrypto]
  allFiat: [IFiat]
}

export const CreateOfferStepOne = ({ tokens, allFiat }: IStep1) => {
  const { setFiat, setQuantity, setUnitPrice, nextStep } = useActions()
  const { crypto, fiat, quantity, unitPrice } = useTypedSelector((state) => state.offerReducer)

  const { tokenAmount } = crypto

  const { symbol, logoUrl: cryptoImage, name: cryptoName } = crypto

  const { ticker, logoUrl: fiatImage, name: fiatName } = fiat

  const [isOpen, setIsOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const searchFilter = (tokens: ICrypto[]) => {
    return tokens.filter(
      (t: ICrypto) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.address.toLowerCase() === searchTerm.toLowerCase() ||
        t.symbol.toLowerCase() === searchTerm.toLowerCase()
    )
  }

  const checkStep1 = () => {
    if (quantity > 0 && quantity <= tokenAmount && unitPrice > 0) return true

    return false
  }

  return (
    <form>
      <Wrapper>
        <div className="flex flex-col gap-5">
          <ModalInput
            symbol={symbol}
            fullName={cryptoName}
            image={cryptoImage}
            onOpen={() => setIsOpen(!isOpen)}
            label={'Crypto'}
          />
          <Dropdown
            value={ticker}
            fullName={fiatName}
            image={fiatImage}
            onAction={setFiat}
            data={allFiat as IFiat[]}
            label={'Fiat'}
          />
          <Input
            onAction={setUnitPrice}
            placeholder={'0'}
            label={'Unit Price'}
            element={ticker}
            value={unitPrice}
          />

          <Input
            maxValue={tokenAmount}
            onAction={setQuantity}
            placeholder={'0'}
            label={'Quantity'}
            element={symbol}
            value={quantity}
          />
        </div>

        <Modal isOpen={isOpen} close={() => setIsOpen(false)} header={'Select Token'}>
          <SearchField
            placeholder={'Enter token name or paste it address'}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
          <TokenList tokens={searchFilter(tokens)} closeModal={() => setIsOpen(false)} />
        </Modal>
      </Wrapper>

      <div className="mt-5">
        <Wrapper>
          <Button name="Next" onClick={nextStep} disabled={!checkStep1()} />
        </Wrapper>
      </div>
    </form>
  )
}
