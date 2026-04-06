import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import NotFound from "./pages/404/404.tsx";
import Cards from "./pages/Cards/Cards.tsx";
import Characters from "./pages/Characters.tsx";
import Faculties from "./pages/Faculties/Faculties.tsx";
import Faculty from "./pages/Faculty/Faculty.tsx";
import Home from "./pages/Home/Home.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/faculty/:name" element={<Faculty />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
