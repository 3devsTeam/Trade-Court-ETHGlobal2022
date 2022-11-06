import React from 'react'
import { Button } from '../ui/Button'

interface Props {
  activeOffer: any
}

export const ActiveOffer: React.FC<Props> = ({ activeOffer }) => {
  const { _id, offer, unitPrice, banks } = activeOffer

  return (
    <></>
    // <div className="grid items-center bg-white shadow-customDark rounded-[20px] p-5">
    //   <div>
    //     <span className="text-purple">{_id}</span>
    //   </div>

    //   <div>
    //     <span
    //       className={`font-bold ${
    //         offerType === 'buy' ? 'text-lightGreen' : 'text-red-400'
    //       }`}>{`${offerType?.[0].toUpperCase()}${offerType?.slice(1)}`}</span>
    //   </div>

    //   <div>
    //     <span>
    //       {unitPrice} {fiat?.ticker}
    //     </span>
    //   </div>

    //   <div>
    //     <span className="font-bold">
    //       {crypto.symbol}/{fiat.ticker}
    //     </span>
    //   </div>

    //   <div>
    //     {payMethods.map((payment) => (
    //       <div>
    //         <span>{payment.bank.name}</span>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="flex flex-col"></div>

    //   <div>
    //     <Button onClick={() => {}} color="bg-black" icon={<></>} />
    //   </div>
    // </div>
  )
}
