import React from 'react'

export const WarningMessage = () => {
  return (
    <div className={'bg-yellow rounded-[15px] px-[20px] py-[10px] font-bold'}>
      <p className={'text-sm'}>
        Please check payment info twice before sending transaction.
        <br />
        Tradecourt are not responsible for lost transactions.
      </p>
    </div>
  )
}
