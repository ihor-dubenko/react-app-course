import { API_URL } from "../../constants";
import {
  useState,
  useEffect,
  useMemo,
  useRef
} from "react";
import { QuestionCadList } from "../../components/QuestionCadList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch.js";
import { SearchInput } from "../../components/SearchInput";
import { Select } from "../../components/Select";
import { Pagination } from "../../components/Pagination";
import cls from "./HomePage.module.css";

const DEFAULT_PER_PAGE = 10;

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "_sort=level", label: "Level ASC" },
  { value: "_sort=-level", label: "Level DESC" },
  { value: "_sort=completed", label: "Completed ASC" },
  { value: "_sort=-completed", label: "Completed DESC" }
];

const perPageOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [perPageSelectValue, setPerPageSelectValue] = useState(perPageOptions[0].value);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const controlContainerRef = useRef();

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
    getQuestions(`react${searchParams}`).catch((err) => console.log(err));
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${perPageSelectValue}&${e.target.value}`);
  }

  const onPerPageSelectChangeHandler = (e) => {
    setPerPageSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  }

  const onPageChangeHandler = (page) => {
    setSearchParams(`?_page=${page}&_per_page=${perPageSelectValue}&${sortSelectValue}`);
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
          id={"sortSelect"}
          name={"sortSelect"}
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          options={sortOptions}
        />
        <Select
          id={"perPageSelect"}
          name={"perPageSelect"}
          value={perPageSelectValue}
          onChange={onPerPageSelectChangeHandler}
          options={perPageOptions}
        />
      </div>
      { isLoading && <Loader /> }
      { error && <p>{error}</p> }
      <QuestionCadList cards={cards} />
      { cards.length === 0 ?
        (
          <p className={cls.noCardsInfo}>No cards...</p>
        ) :
        pagination.length > 1 &&
        (
          <Pagination questions={questions} pagination={pagination} onClick={(page) => onPageChangeHandler(page)}/>
        )
      }
    </>
  )
}

