import { SetStateAction } from "react";
import { Cross } from "./icons/Cross";
import { Loop } from "./icons/Loop";

interface ISearchField {
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
  searchTerm: string;
  placeholder: string;
}

export const SearchField = ({
  setSearchTerm,
  searchTerm,
  placeholder,
}: ISearchField) => {
  return (
    <div
      className={`group border-2 border-gray-200 pl-3 bg-transparent flex items-center justify-between rounded-[15px] hover:border-purple hover:bg-white transition-colors duration-300`}
    >
      <Loop />
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className='w-full outline-none py-3 bg-transparent rounded-md font-bold ml-2'
      />
      {searchTerm.length ? (
        <button onClick={() => setSearchTerm("")} className='cursor-pointer'>
          <Cross />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
