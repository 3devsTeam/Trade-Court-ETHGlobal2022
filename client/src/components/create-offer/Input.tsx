import React from "react";

export interface IInput {
  onAction: any;
  label?: string;
  placeholder: string;
  value: string | number;
  element?: any;
  maxValue?: any;
  error?: any;
}

export const Input = ({
  error,
  maxValue,
  onAction,
  label,
  placeholder,
  value,
  element,
}: IInput) => {
  return (
    <label htmlFor={label}>
      <span className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</span>
      <div
        className={`flex items-center border-2 border-purple rounded-[15px] h-[60px]`}
      >
        <input
          name={label}
          autoComplete={"off"}
          autoCorrect={"off"}
          spellCheck={false}
          onChange={(e) => onAction(e.target.value)}
          className={`outline-none p-[10px] rounded-[15px] w-full h-full bg-transparent`}
          placeholder={placeholder}
          value={value}
        />

        <div className='flex space-x-2 pr-[10px]'>
          {maxValue ? (
            <div className='flex space-x-2'>
              <button
                type='button'
                onClick={() => onAction(maxValue)}
                className={"font-bold text-purple"}
              >
                Max
              </button>

              <span className={"text-gray-300"}>|</span>
            </div>
          ) : null}
          {element && <div className={"font-bold"}>{element}</div>}
        </div>
      </div>
    </label>
  );
};
