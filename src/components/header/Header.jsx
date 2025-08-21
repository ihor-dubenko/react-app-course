import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import cls from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
      <header className={cls.header}>
        <p onClick={() => navigate("/")} className={cls.logo}>
          <img src={ReactLogo} alt="react logo"/>
          <span>ReactCards</span>
        </p>
        <div className={cls.headerButtons}>
          <Button isActive onClick={() => navigate("/add-question")}>Add</Button>
          <Button>Login</Button>
        </div>
      </header>
  )
}
