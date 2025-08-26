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
    getQuestions("react").catch(err => console.log(err));
  }, []);

  const onSearchValueHandler = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <div className={cls.controlContainer}>
        <SearchInput value={searchValue} onChange={onSearchValueHandler} />
      </div>
      { isLoading && <Loader /> }
      { error && <p>{error}</p> }
      { cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p> }
      <QuestionCadList cards={cards} />
    </>
  )
}
