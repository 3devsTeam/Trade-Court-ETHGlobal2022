import React from 'react'
import demo from '../../assets/images/demo.svg'

export const Schedule = () => {
  return (
    <div className={'bg-white rounded-[20px] p-4 shadow-customDark relative'}>
      <span className={'absolute font-bold text-md left-[50%] -translate-x-1/2'}>Daily volume</span>
      <img className={'w-full h-full'} src={demo} alt={''} />
    </div>
  )
}
