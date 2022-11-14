import { useEffect, useState } from 'react'
import { Offer } from '../components/home/Offer'
import { Legend } from '../components/home/Legend'
import { SearchField } from '../components/ui/SearchField'
import { Dropdown } from '../components/home/Dropdown'
import { useFetchFilters } from '../hooks/useFetchFilters'
import { useInfiniteOffers } from '../hooks/useInfiniteOffers'
import { Button } from '../components/ui/Button'
import useDebounce from '../hooks/useDebounce'
import { ICrypto } from '../types/interfaces/crypto.interface'
import { IFiat } from '../types/interfaces/fiat.interface'
import { IPayment } from '../types/interfaces/payment.interface'
import { IRegion } from '../types/interfaces/region.interface'
import { IBank } from '../types/interfaces/bank.interface'
import { IOffer } from '../types/interfaces/offer.interface'
import { NoItems } from '../components/errors/no-items'

export interface IActiveFilters {
  amount: string
  crypto: string | undefined
  fiat: string | undefined
  banks: string | undefined
  region: string | undefined
}

const HomePage = () => {
  const initialFilters: IActiveFilters = {
    amount: '',
    crypto: '',
    fiat: '',
    banks: '',
    region: ''
  }

  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const [activeCrypto, setActiveCrypto] = useState<ICrypto | null>(null)
  const [activeFiat, setActiveFiat] = useState<IFiat | null>(null)
  const [activePayment, setActivePayment] = useState<IPayment | null>(null)
  const [activeRegion, setActiveRegion] = useState<IRegion | null>(null)
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>(initialFilters)

  useEffect(() => {
    setActiveFilters({
      amount: debouncedAmount,
      crypto: activeCrypto?._id || '',
      fiat: activeFiat?._id || '',
      banks: activePayment?.id || '',
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
      {/* <SkeletonWrapper isLoadeding={isLoaded} height={1000}> */}
      <aside className="bg-white shadow-customDark p-5 rounded-2xl flex flex-col gap-5 sticky top-5 overflow-auto max-h-screen">
        <SearchField searchTerm={amount} setSearchTerm={setAmount} placeholder="Search..." />
        <Dropdown
          onSelect={setActiveCrypto}
          data={{
            items: crypto.data as [ICrypto],
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
          text="text-black"
          border="border"
          name={'Clear'}
          color={'transparent'}
          onClick={() => {
            setActiveCrypto(null)
            setActiveFiat(null)
            setActivePayment(null)
            setActiveRegion(null)
          }}
        />
      </aside>
      {/* </SkeletonWrapper> */}

      <main className="relative">
        {/* <SkeletonWrapper height={30} isLoaded={isLoaded} margin={'20px'}> */}
        <Legend fields={fields} />
        {/* </SkeletonWrapper> */}
        {/* <SkeletonWrapper isLoaded={isLoaded} height={100} count={10} margin={'20px'}> */}
        {data?.pages[0].length === 0 ? (
          <NoItems />
        ) : (
          <div className="space-y-3 flex flex-wrap">{content}</div>
        )}
        {/* </SkeletonWrapper> */}
      </main>
    </div>
  )
}

export default HomePage
