import { Button } from "../Button";
import cls from "./Pagination.module.css";

export const Pagination = ({ questions, pagination, onClick }) => {
  const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);
    return <div className={cls.paginationContainer}>
      {
        pagination.map((value, key) => {
          return <Button key={key} isActive={value === getActivePageNumber()} onClick={() => onClick(value)}>{value}</Button>
        })
      }
    </div>;
}
