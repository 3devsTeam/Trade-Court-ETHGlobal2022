import React from 'react'

interface Props {
  amount: number
  fiat: string
}

export const ApprovalStep: React.FC<Props> = ({ amount }) => {
  return (
    <div>Payment sent Please, comfirm if funds are recieved You should recieve: {amount} RUB</div>
  )
}
