import React, { useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { CloseButton } from "./CloseButton";
import { ModalOverlay } from "./ModalOverlay";

interface IModal {
  isOpen: boolean;
  width?: string;
  children: React.ReactNode;
  close: React.Dispatch<any>;
  header: string;
}

export const Modal = ({ isOpen, width, children, close, header }: IModal) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => close(false));

  return (
    <>
      {isOpen && (
        <>
          <ModalOverlay />

          <div
            style={{
              width: width,
            }}
            ref={ref}
            className={`bg-white overflow-y-auto fixed shadow-lg rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-50 mobile:w-screen mobile:top-0 tablet:w-screen`}
          >
            <div className="flex justify-between items-center mb-[20px]">
              <div>
                <span className="font-bold text-lg mb-3">{header}</span>
              </div>
              <CloseButton onClose={close} />
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
};
