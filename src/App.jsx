import { MainLayout } from "./components/MainLayout";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPage } from "./pages/AddQuestionPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<div>forbidden</div>} />
            <Route path="/add-question" element={<AddQuestionPage />} />
            <Route path="/question/:id" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
