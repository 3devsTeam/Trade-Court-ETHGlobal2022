import React from 'react'

interface Props {
  amount: number
  fiat: string
}

export const ApprovalStep: React.FC<Props> = ({ amount }) => {
  return (
    <div className="h-[40vh] flex justify-center items-center text-center font-bold text-xl">
      Payment sent <br /> Please, comfirm if funds are recieved <br /> You should recieve: {amount}{' '}
      RUB
    </div>
  )
}
