import { MainLayout } from "./components/MainLayout";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>home</div>} />
            <Route path="/forbidden" element={<div>forbidden</div>} />
            <Route path="/addquestion" element={<div>add question</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
