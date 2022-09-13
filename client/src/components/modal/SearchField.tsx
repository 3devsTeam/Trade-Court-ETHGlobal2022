import { Loop } from "./Loop";

interface ISearchField {
  onAction: any;
  value: string;
  placeholder: string;
}

export const SearchField = ({ onAction, value, placeholder }: ISearchField) => {
  return (
    <div className="h-12 px-3 border-2 border-purple rounded-md flex items-center justify-between mb-[20px]">
      {/* <div className="flex items-center justify-between"> */}
      <Loop />
      <input
        value={value}
        onChange={(e) => onAction(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none rounded-md font-bold ml-2"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onAction("");
        }}
        className="cursor-pointer text-purple"
      >
        Clear
      </button>
      {/* </div> */}
    </div>
  );
};
