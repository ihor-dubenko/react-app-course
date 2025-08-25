import cls from "./QuestionCadList.module.css";
import { QuestionCard } from "../QuestionCard/index.jsx";

export const QuestionCadList = ({ cards }) => {
  return (
      <div className={cls.cardList}>
        {
          cards.map((card, index) => {
            return <QuestionCard card={card} key={index} />
          })
        }
      </div>
  )
}
