import { Navigate, useLocation } from "react-router";
import FacultyCard from "../../components/faculties/FacultyCard";
import { facultyFromQuizAnswers } from "../Quiz/quizData";
import type { QuizResultLocationState } from "../../types/quiz.type";
import "./QuizResult.css";

export default function QuizResult() {
  const location = useLocation();
  const state = location.state as QuizResultLocationState | null;
  const answers = state?.answers;

  if (!answers) {
    return <Navigate to="/quiz" replace />;
  }

  const faculty = facultyFromQuizAnswers(answers);
  if (!faculty) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <section className="quiz-result">
      <h1 className="quiz-result__title">
        <span className="quiz-result__title-line">CONGRATULATIONS!</span>
        <span className="quiz-result__title-line">
          YOU ARE NOW A MEMBER OF THE FACULTY
        </span>
      </h1>

      <FacultyCard faculty={faculty} />
    </section>
  );
}
