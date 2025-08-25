import { API_URL } from "../../constants/index.js";
import {
  useState,
  useEffect
} from "react";
import { QuestionCadList } from "../../components/QuestionCadList/index.jsx";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setCards(questions);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <QuestionCadList cards={cards} />
    </>
  )
}
