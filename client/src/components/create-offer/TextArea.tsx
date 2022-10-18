import React from "react";

interface ITextArea {
  value: string | undefined;
  onAction: any;
  label: string;
  placeholder: string;
}

export const TextArea = ({
  value,
  label,
  placeholder,
  onAction,
}: ITextArea) => {
  return (
    <label>
      <span className={"text-lg font-bold mb-1 ml-[10px]"}>{label}</span>

      <div>
        <textarea
          spellCheck={false}
          value={value}
          onChange={(e) => onAction(e.target.value)}
          placeholder={placeholder}
          className={`border-2 border-purple rounded-[15px] p-3 w-full min-h-[200px]`}
        />
      </div>
    </label>
  );
};
