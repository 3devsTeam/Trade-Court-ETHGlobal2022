import React from "react";

export interface IInput {
  type: React.HTMLInputTypeAttribute;
  onAction: any;
  label?: string;
  placeholder?: string;
  value?: string | number;
  cursor?: string;
  element?: any;
  maxValue?: any;
}

export const Input = ({
  maxValue,
  type,
  onAction,
  label,
  placeholder,
  value,
  cursor,
  element,
}: IInput) => {
  return (
    <label>
      <p className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</p>
      <div className="flex items-center border-2 border-purple rounded-[15px] h-[60px]">
        <input
          type={type}
          onChange={(e) => onAction(e.target.value)}
          className={`outline-none p-[10px] rounded-[15px] cursor-${cursor} w-full h-full`}
          placeholder={placeholder}
          value={value ? value : ""}
        />
        <div className={`flex ${maxValue ? "gap-1" : ""}`}>
          {maxValue ? (
            <button
              type="button"
              onClick={() => onAction(maxValue)}
              className={"font-bold text-purple"}
            >
              Max
            </button>
          ) : (
            ""
          )}
          {maxValue ? <div className={"text-gray"}>|</div> : ""}
          {element ? (
            <div className={"mr-[10px] font-bold"}>{element}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </label>
  );
};
