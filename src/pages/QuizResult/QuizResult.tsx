import { Navigate, useLocation } from "react-router";
import { useMemo } from "react";
import FacultyCard from "../../components/faculties/FacultyCard";
import {
  computeFacultyFromAnswers,
  getFacultyForCard,
  isQuizComplete,
} from "../Quiz/quizData";
import "./QuizResult.css";

type LocationState = { answers?: Record<string, number> };

export default function QuizResult() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const answers = state?.answers;

  const facultyEnum = useMemo(() => {
    if (!answers || !isQuizComplete(answers)) return null;
    return computeFacultyFromAnswers(answers);
  }, [answers]);

  if (!answers || !isQuizComplete(answers) || !facultyEnum) {
    return <Navigate to="/quiz" replace />;
  }

  const faculty = getFacultyForCard(facultyEnum);

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
