import { API_URL } from "../../constants/index.js";
import {
  useState,
  useEffect
} from "react";
import { QuestionCadList } from "../../components/QuestionCadList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch.js";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [getCards, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const cards = await response.json();
    setCards(cards);
    return cards;
  });

  useEffect(() => {
    getCards("react").catch(err => console.log(err));
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
      <QuestionCadList cards={cards} />
    </>
  )
}
