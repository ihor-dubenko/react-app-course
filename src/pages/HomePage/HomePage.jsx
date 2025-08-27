import { API_URL } from "../../constants/index.js";
import {
  useState,
  useEffect,
  useMemo, useRef
} from "react";
import { QuestionCadList } from "../../components/QuestionCadList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import cls from "./HomePage.module.css";
import { Select } from "../../components/Select/index.jsx";
import { Button } from "../../components/Button/index.jsx";

const DEFAULT_PER_PAGE = 10;

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "_sort=level", label: "Level ASC" },
  { value: "_sort=-level", label: "Level DESC" },
  { value: "_sort=completed", label: "Completed ASC" },
  { value: "_sort=-completed", label: "Completed DESC" }
];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const controlContainerRef = useRef();

  const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter(d => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount).fill(0).map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  }

  const onPageChangeHandler = (page) => {
    setSearchParams(`?_page=${page}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`);
    controlContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className={cls.controlContainer} ref={controlContainerRef}>
        <SearchInput
          value={searchValue}
          onChange={onSearchChangeHandler}
        />
        <Select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          options={sortOptions}
        />
      </div>
      { isLoading && <Loader /> }
      { error && <p>{error}</p> }
      <QuestionCadList cards={cards} />
      { cards.length === 0 ?
        (
          <p className={cls.noCardsInfo}>No cards...</p>
        ) :
        (
          <div className={cls.paginationContainer}>
            {
              pagination.map((value, key) => {
                return <Button key={key} isActive={value === getActivePageNumber()} onClick={() => onPageChangeHandler(value)}>{value}</Button>
              })
            }
          </div>
        )
      }
    </>
  )
}
