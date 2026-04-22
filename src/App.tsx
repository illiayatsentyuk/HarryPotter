import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import NotFound from "./pages/404/404.tsx";
import Characters from "./pages/Characters/Characters.tsx";
import Faculties from "./pages/Faculties/Faculties.tsx";
import Faculty from "./pages/Faculty/Faculty.tsx";
import Home from "./pages/Home/Home.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import QuizResult from "./pages/QuizResult/QuizResult.tsx";
import Spells from "./pages/Spells/Spells.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/spells" element={<Spells />} />
          <Route path="/faculty/:name" element={<Faculty />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
