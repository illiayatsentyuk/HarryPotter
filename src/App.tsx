import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import NotFound from "./pages/404.tsx";
import Cards from "./pages/Cards.tsx";
import Characters from "./pages/Characters.tsx";
import Faculties from "./pages/Faculties.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
