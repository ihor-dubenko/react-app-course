import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../header";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={cls.mainLayout}>
      <Header />
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          React Question Cards Application | {currentYear} <br/>
          by Ihor Dubenko
        </footer>
      </div>
    </div>
  );
}
