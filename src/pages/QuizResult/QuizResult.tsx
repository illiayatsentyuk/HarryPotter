import { Navigate, useLocation } from "react-router";
import FacultyCard from "../../components/faculties/FacultyCard";
import { facultyFromQuizAnswers } from "../Quiz/quizData";
import type { QuizResultLocationState } from "../../types/quiz.type";
import DeerImage from "../../assets/images/deer.jpg"
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
    <>
    <img className="quiz-result__image" src={DeerImage} alt="" />
    <section className="quiz-result">
      <h1 className="quiz-result__title">
        <span className="quiz-result__title-line">CONGRATULATIONS!</span>
        <span className="quiz-result__title-line">
          YOU ARE NOW A MEMBER OF THE FACULTY
        </span>
      </h1>

      <FacultyCard faculty={faculty} />
    </section>
    </>
  );
}
