import React from 'react'

interface Props {
  children: React.ReactNode
}

export const Wrapper = ({ children }: Props) => {
  return (
    <div className={'flex flex-col bg-white rounded-[20px] p-5 gap-5 shadow-customDark w-full'}>
      {children}
    </div>
  )
}
