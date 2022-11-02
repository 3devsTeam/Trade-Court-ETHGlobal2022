import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Offer } from '../components/home/offer/Offer'
import { Legend } from '../components/home/Legend'
import { useQuery } from '@tanstack/react-query'
import { OfferService } from '../api/offer.services'
import { SkeletonWrapper } from '../components/ui/SkeletonWrapper'
import { SearchField } from '../components/ui/SearchField'
import { Dropdown } from '../components/home/dropdown/Dropdown'
import { useFetchFilters } from '../hooks/useFetchFilters'
import { useInfiniteOffers } from '../hooks/useInfiniteOffers'
import { Button } from '../components/ui/Button'
import useDebounce from '../hooks/useDebounce'
import { IToken } from '../interfaces/IToken'
import { IFiat } from '../interfaces/IFiat'
import { IPayment } from '../interfaces/IPayment'
import { IRegion } from '../interfaces/IRegion'
import { IBank } from '../interfaces/IBank'

export interface IActiveFilters {
  amount: string
  crypto: string | undefined
  fiat: string | undefined
  banks: string | undefined
  region: string | undefined
}

export const Home = () => {
  const initialFilters: IActiveFilters = {
    amount: '',
    crypto: '',
    fiat: '',
    banks: '',
    region: ''
  }

  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const [activeCrypto, setActiveCrypto] = useState<IToken | null>(null)
  const [activeFiat, setActiveFiat] = useState<IFiat | null>(null)
  const [activePayment, setActivePayment] = useState<IPayment | null>(null)
  const [activeRegion, setActiveRegion] = useState<IRegion | null>(null)
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>(initialFilters)

  useEffect(() => {
    setActiveFilters({
      amount: debouncedAmount,
      crypto: activeCrypto?._id || '',
      fiat: activeFiat?._id || '',
      banks: activePayment?._id || '',
      region: activeRegion?._id || ''
    })
  }, [activeCrypto, activeFiat, activePayment, activeRegion, debouncedAmount])

  const { fiat, crypto, isFiltersFetchOk } = useFetchFilters()

  const { data, error, status, lastItemRef } = useInfiniteOffers(activeFilters)

  const isLoaded = isFiltersFetchOk && status === 'success'

  const content = data?.pages.map((page) => {
    return page?.map((offer: IOffer, i: number) => {
      if (page.length === i + 1) {
        return <Offer ref={lastItemRef} {...offer} key={offer._id} />
      }
      return <Offer {...offer} key={offer._id} />
    })
  })

  const fields = [
    {
      name: 'Maker',
      className: 'flex-1'
    },
    {
      name: 'Price',
      className: 'flex-1'
    },
    {
      name: 'Avaliable / Limit',
      className: 'flex-[2_0]'
    },
    {
      name: 'Payment',
      className: 'flex-1'
    },
    {
      name: 'Trade',
      className: 'flex-1'
    }
  ]

  return (
    <div className="grid grid-cols-homePage gap-5 my-5">
      <SkeletonWrapper isLoaded={isLoaded} height={1000}>
        <aside className="bg-white shadow-customDark p-5 rounded-2xl flex flex-col gap-5 sticky top-5 overflow-auto max-h-screen">
          <SearchField searchTerm={amount} setSearchTerm={setAmount} placeholder="Search..." />
          <Dropdown
            onSelect={setActiveCrypto}
            data={{
              items: crypto.data as [IToken],
              options: 'symbol'
            }}
            label="Crypto"
            activeSelect={activeCrypto}
          />
          <Dropdown
            onSelect={setActiveFiat}
            data={{
              items: fiat.data as [IFiat],
              options: 'ticker'
            }}
            label="Fiat"
            activeSelect={activeFiat}
          />
          {activeFiat && (
            <>
              <Dropdown
                onSelect={setActivePayment}
                data={{
                  items: activeFiat.banks as [IBank],
                  options: 'name'
                }}
                activeSelect={activePayment}
                label="Payment"
              />
              <Dropdown
                onSelect={setActiveRegion}
                data={{
                  items: activeFiat.regions as [IRegion],
                  options: 'name'
                }}
                activeSelect={activeRegion}
                label="Region"
              />
            </>
          )}
          <Button
            name={'Clear All'}
            onClick={() => {
              setActiveCrypto(null)
              setActiveFiat(null)
              setActivePayment(null)
              setActiveRegion(null)
            }}
          />
        </aside>
      </SkeletonWrapper>

      <main className="relative">
        <SkeletonWrapper height={30} isLoaded={isLoaded} margin={'20px'}>
          <Legend fields={fields} />
        </SkeletonWrapper>
        <SkeletonWrapper isLoaded={isLoaded} height={100} count={10} margin={'20px'}>
          {data?.pages[0].length === 0 ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-2xl font-bold">No items found...</span>
            </div>
          ) : (
            <div className="space-y-2 flex flex-wrap">{content}</div>
          )}
        </SkeletonWrapper>
      </main>
    </div>
  )
}
