import { useState } from "react";
import { useNavigate } from "react-router";
import { facultyFromQuizAnswers, QUIZ_QUESTIONS } from "./quizData";
import "./Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setSubmitted(false);
  };

  const handleShowResults = () => {
    if (facultyFromQuizAnswers(answers) === null) {
      setSubmitted(true);
      return;
    }
    navigate("/quiz-result", { state: { answers } });
  };

  const answeredCount = QUIZ_QUESTIONS.filter(
    (q) => answers[q.id] !== undefined,
  ).length;

  return (
    <div className="quiz">
      <h1 className="quiz__title">FIND OUT WHICH FACULTY YOU&apos;RE IN</h1>

      <div className="quiz__panel">
        <form
          className="quiz__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleShowResults();
          }}
        >
          {QUIZ_QUESTIONS.map((q) => (
            <fieldset key={q.id} className="quiz__question">
              <legend className="quiz__question-title">{q.title}</legend>
              <div className="quiz__options" role="radiogroup">
                {q.options.map((opt, i) => {
                  const inputId = `${q.id}-${i}`;
                  return (
                    <label key={inputId} className="quiz__option" htmlFor={inputId}>
                      <input
                        id={inputId}
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === i}
                        onChange={() => setAnswer(q.id, i)}
                        className="quiz__radio"
                      />
                      <span className="quiz__option-text">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <div className="quiz__actions">
            <button className="quiz__submit" type="submit">
              SHOW RESULTS
            </button>
          </div>
        </form>

        {submitted && (
          <p className="quiz__hint" role="status">
            {`Answer all ${QUIZ_QUESTIONS.length} questions to see your house. (${answeredCount}/${QUIZ_QUESTIONS.length} answered)`}
          </p>
        )}
      </div>
    </div>
  );
}
