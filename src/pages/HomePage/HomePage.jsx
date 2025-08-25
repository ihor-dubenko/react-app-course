import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard/index.jsx";
import { API_URL } from "../../constants/index.js";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setQuestions(questions);
      console.log(questions);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      {
        questions.map((card, index) => {
          return <QuestionCard card={card} key={index} />
        })
      }
    </>
  )
}
