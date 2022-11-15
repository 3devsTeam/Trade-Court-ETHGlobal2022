import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export const Preview = () => {
  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    timeLimit,
    minLimit,
    maxLimit,
    offerComment,
    payMethods
  } = useTypedSelector((state) => state.createOfferReducer)

  const { symbol, logoUrl: cryptoImage } = crypto

  const { ticker, logoUrl: fiatImage } = fiat

  return (
    <div className={'bg-white rounded-[20px] shadow-customDark row-span-2 break-words h-full'}>
      <div className={'bg-purple rounded-t-[20px] p-5'}>
        <p className={'text-white text-[32px] font-bold'}>Preview</p>
      </div>

      <div className={'flex flex-col gap-5 p-5'}>
        <div className={'flex items-center justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Crypto</span>
          </div>
          <div className={'flex gap-1 items-center'}>
            <img className={'image'} src={cryptoImage} alt={''} />
            <span className={'font-medium'}>{symbol}</span>
          </div>
        </div>

        <div className={'flex justify-between items-center'}>
          <div>
            <span className={'font-bold text-lg'}>Fiat</span>
          </div>
          <div className={'flex gap-1 items-center'}>
            <img className={'image'} src={fiatImage} alt={''} />
            <span className={'font-medium'}>{ticker}</span>
          </div>
        </div>

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Unit Price</span>
          </div>
          <div>
            <span className={'font-medium'}>
              {unitPrice} {ticker}
            </span>
          </div>
        </div>

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Quantity</span>
          </div>
          <div>
            <span className={'font-medium'}>
              {quantity} {symbol}
            </span>
          </div>
        </div>

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Total Amount</span>
          </div>
          <div>
            <span className={'font-medium'}>
              {+unitPrice * +quantity} {ticker}
            </span>
          </div>
        </div>

        <hr />

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Payment Methods</span>
          </div>
          <div>
            {payMethods.length
              ? payMethods?.map((payment, i) => {
                  return (
                    <div key={i} className={'flex items-center gap-1 my-2'}>
                      <img className={'image'} src={payment?.bank?.logoUrl} alt="" />
                      <p>{payment?.bank?.name}</p>
                    </div>
                  )
                })
              : '-'}
          </div>
        </div>

        <hr />

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Time Limit</span>
          </div>
          <div>
            <span className={'font-medium'}>{timeLimit} min</span>
          </div>
        </div>

        <div className={'flex justify-between'}>
          <div>
            <span className={'font-bold text-lg'}>Price Limit</span>
          </div>
          <div>
            <span className={'font-medium'}>{`${minLimit ? minLimit : ''}-${
              maxLimit ? maxLimit : ''
            }`}</span>
          </div>
        </div>

        <div className={'flex justify-between gap-5'}>
          <div>
            <span className={'font-bold text-lg'}>Comment</span>
          </div>
          <div>
            <p className={'font-medium'}>{offerComment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
