import React from 'react'
import confeti from '../../assets/images/confeti.png'
import good from '../../assets/images/good.png'
import neutral from '../../assets/images/neutral.png'
import bad from '../../assets/images/bad.png'

export const SuccessPage = () => {
  return (
    <div>
      <div className={'flex justify-center items-center h-[400px]'}>
        <div className={'flex flex-col items-center gap-2'}>
          <div className={'flex text-2xl gap-2 mb-[20px]'}>
            <span className={'font-bold'}>Success</span>
            <img src={confeti} height={40} width={40} />
          </div>

          <span className={'font-bold text-lg'}>How was it?</span>
          <div className={'flex items-center gap-4'}>
            <img
              src={bad}
              height={40}
              width={40}
              className={'hover:scale-110 transition-transform duration-300 cursor-pointer'}
            />
            <img
              src={neutral}
              height={40}
              width={40}
              className={'hover:scale-110 transition-transform duration-300 cursor-pointer'}
            />
            <img
              src={good}
              height={40}
              width={40}
              className={'hover:scale-110 transition-transform duration-300 cursor-pointer'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
