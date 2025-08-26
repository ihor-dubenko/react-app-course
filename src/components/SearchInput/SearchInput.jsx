import cls from "./SearchInput.module.css";
import { useId } from "react";
import { SearchIcon } from "../icons";

export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();
  return (
      <div className={cls.inputContainer}>
        <label htmlFor={inputId}>
          <SearchIcon className={cls.searchIcon}/>
        </label>
        <input id={inputId} type="text" className={cls.input} value={value} placeholder="search..." onChange={onChange} />
      </div>
  )
}
