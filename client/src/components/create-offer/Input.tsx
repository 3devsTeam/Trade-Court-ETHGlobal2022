import React from "react";

export interface IInput {
  type: React.HTMLInputTypeAttribute;
  onAction: any;
  register?: any;
  label?: string;
  placeholder?: string;
  value?: string | number;
  readOnly: boolean;
  outline?: boolean;
  cursor?: string;
  element?: any;
}

export const Input = ({
  type,
  onAction,
  register,
  label,
  placeholder,
  value,
  readOnly,
  outline,
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
          //{...register}
          className={`font-bold p-[10px] rounded-[15px] ${
            outline === false ? "outline-none" : ""
          } cursor-${cursor} w-full h-full`}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
        />
        {element != undefined ? (
          <div className={"mr-[10px] font-bold"}>{element}</div>
        ) : null}
      </div>
    </label>
  );
};
