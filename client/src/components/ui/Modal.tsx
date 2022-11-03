import React, { useRef, useEffect } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { CloseButton } from './CloseButton'
import { ModalOverlay } from './ModalOverlay'

interface IModal {
  isOpen: boolean
  width?: string
  children: React.ReactNode
  close: any
  header: string
}

export const Modal = ({ isOpen, children, close, header }: IModal) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => close())

  return (
    <div>
      {isOpen && (
        <div>
          <ModalOverlay />

          <div
            style={{
              width: '35%'
            }}
            ref={ref}
            className={`bg-white overflow-y-auto fixed shadow-customDark rounded-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-50 mobile:w-screen mobile:top-0 tablet:w-screen`}
          >
            <div className="flex justify-between items-center mb-[10px]">
              <div>
                <span className="font-bold text-lg">{header}</span>
              </div>
              <CloseButton onAction={() => close()} />
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
