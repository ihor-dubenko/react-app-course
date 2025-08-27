import { API_URL } from "../../constants/index.js";
import {
  useState,
  useEffect,
  useMemo
} from "react";
import { QuestionCadList } from "../../components/QuestionCadList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    return questions.filter(d => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`).catch(err => console.log(err));
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  }

  return (
    <>
      <div className={cls.controlContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        <select name="select" value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
          <option value="">Sort by</option>
          <option value="_sort=level">Level ASC</option>
          <option value="_sort=-level">Level DESC</option>
          <option value="_sort=completed">Completed ASC</option>
          <option value="_sort=-completed">Completed DESC</option>
        </select>
      </div>
      { isLoading && <Loader /> }
      { error && <p>{error}</p> }
      { cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p> }
      <QuestionCadList cards={cards} />
    </>
  )
}
