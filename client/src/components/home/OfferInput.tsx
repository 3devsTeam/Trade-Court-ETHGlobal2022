import React from "react";

interface IOfferInput {
  setValue: React.Dispatch<any>;
  maxValue?: number;
  inputContent: any;
  value: number;
  placeholder: string;
  label: string;
  readOnly?: boolean;
}

export const OfferInput = ({
  inputContent,
  placeholder,
  value,
  setValue,
  maxValue,
  label,
  readOnly,
}: IOfferInput) => {
  return (
    <div>
      <label htmlFor={label}>
        <span className={"font-bold"}>{label}</span>
      </label>
      <div
        className={
          "flex items-center border-2 border-purple rounded-[20px] font-bold"
        }
      >
        <input
          autoComplete={"off"}
          id={label}
          readOnly={readOnly}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          value={value ? value : ""}
          className={"w-full outline-none p-3 rounded-[20px]"}
        />
        <div className={`flex ${maxValue ? "gap-1" : ""} mr-2`}>
          {maxValue && (
            <>
              <button
                onClick={() => setValue(maxValue)}
                className={"text-purple"}
              >
                Max
              </button>
              <span className={"text-gray"}>|</span>
            </>
          )}
          {inputContent}
        </div>
      </div>
    </div>
  );
};
