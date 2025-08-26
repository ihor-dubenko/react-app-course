import cls from "./QuestionCadList.module.css";
import { QuestionCard } from "../QuestionCard/index.jsx";
import { memo } from "react";

export const QuestionCadList = memo(({ cards }) => {
  return (
      <div className={cls.cardList}>
        {
          cards.map((card, index) => {
            return <QuestionCard card={card} key={index} />
          })
        }
      </div>
  )
});
