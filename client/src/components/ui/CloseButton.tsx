import React from "react";

interface ICloseButton {
  onClose: any;
  width?: string;
  height?: string;
}

export const CloseButton = ({ onClose, width, height }: ICloseButton) => {
  return (
    <button type='button' className='w-8 h-8'>
      <div
        className='flex justify-center items-center rounded-md cursor-pointer w-full h-full hover:bg-lightGray transition-color duration-300'
        onClick={onClose}
      >
        <svg
          width='13'
          height='12'
          viewBox='0 0 13 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.4025 5.9925L11.6925 1.7025C12.0825 1.3125 12.0825 0.6825 11.6925 0.2925C11.3025 -0.0975 10.6725 -0.0975 10.2825 0.2925L5.9925 4.5825L1.7025 0.2925C1.3125 -0.0975 0.6825 -0.0975 0.2925 0.2925C-0.0975 0.6825 -0.0975 1.3125 0.2925 1.7025L4.5825 5.9925L0.2925 10.2825C-0.0975 10.6725 -0.0975 11.3025 0.2925 11.6925C0.4925 11.8925 0.7425 11.9825 1.0025 11.9825C1.2625 11.9825 1.5125 11.8825 1.7125 11.6925L6.0025 7.4025L10.2925 11.6925C10.4925 11.8925 10.7425 11.9825 11.0025 11.9825C11.2625 11.9825 11.5125 11.8825 11.7125 11.6925C12.1025 11.3025 12.1025 10.6725 11.7125 10.2825L7.4225 5.9925H7.4025Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </button>
  );
};
