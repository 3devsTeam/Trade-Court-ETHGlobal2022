import React from 'react'
import { useActions } from '../../hooks/useActions'
import { ICrypto } from '../../types/interfaces/crypto.interface'

interface Props {
  virtualItem: any
  token: ICrypto
  close: any
}

export const Token = ({ virtualItem, token, close }: Props) => {
  const { setCrypto } = useActions()
  const { symbol, balance, logoUrl, name, tokenAmount } = token

  const selectHandler = (token: ICrypto) => {
    setCrypto(token)
    close()
  }

  return (
    <button
      type={'button'}
      onClick={() => selectHandler(token)}
      className={
        'flex items-center justify-between gap-2 px-3 cursor-pointer hover:bg-lightGray transition-colors duration-300 rounded-[15px]'
      }
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`
      }}
    >
      <div className={'flex items-center gap-3'}>
        <img className={'image'} src={logoUrl} alt={''} />
        <div className={'flex flex-col items-start'}>
          <span className={'font-bold'}>{name}</span>
          <span className={'text-gray tracking-wide font-medium'}>
            {tokenAmount} {symbol}
          </span>
        </div>
      </div>

      <div>
        <span className={'font-bold'}>{`${balance > 0 ? `$${balance}` : balance}`}</span>
      </div>
    </button>
  )
}
