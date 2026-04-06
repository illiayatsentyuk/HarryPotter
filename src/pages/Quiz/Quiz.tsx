import { useState } from "react";
import "./Quiz.css";

type Question = {
  id: string;
  title: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "Question 1: Which path to success will you choose?",
    options: [
      "The shortest one, even if it means bending the rules.",
      "The most difficult one, where I can show my courage.",
      "The most logical one, planned down to the smallest detail.",
      "The one where I can help others.",
    ],
  },
  {
    id: "q2",
    title:
      "Question 2: What are you most afraid of hearing said about yourself?",
    options: [
      "He’s ordinary and has achieved nothing.",
      "He chickened out when he was needed.",
      "He made a mistake out of ignorance.",
      "He betrayed our friendship.",
    ],
  },
  {
    id: "q3",
    title: "Question 3: Your ideal evening at Hogwarts?",
    options: [
      "A secret meeting in the dungeons to plan a strategy.",
      "Practising on broomsticks in the rain.",
      "Studying a rare scroll in the library.",
      "Having tea by the fireplace with friends and elves.",
    ],
  },
  {
    id: "q4",
    title:
      "4. You see a senior student bullying a junior. What is your first reaction?",
    options: [
      "I’ll assess the situation: if it’s an influential student, it’s better to act tactfully later.",
      "I’ll intervene immediately, even if my opponent’s strength far outweighs mine.",
      "I’ll find a logical way to stop it or call a professor.",
      "I’ll stand between them to protect the weaker one and try to settle things peacefully.",
    ],
  },
  {
    id: "q5",
    title: "5. What do you see in the Mirror of Erised?",
    options: [
      "Myself at the pinnacle of power, where the whole world recognises my superiority.",
      "Myself as a legendary hero holding a cup after a great battle.",
      "Myself in an endless archive, where I possess all the secrets of the universe.",
      "Myself in a cosy circle of loyal friends, where everyone is happy and safe.",
    ],
  },
  {
    id: "q6",
    title: "6. Which trait in people disgusts you the most?",
    options: [
      "Weakness of spirit and a lack of any ambition in life.",
      "Cowardice when faced with difficult decisions.",
      "Ignorance and a reluctance to question the obvious.",
      "Ingratitude for kindness and indifference to the feelings of loved ones.",
    ],
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setSubmitted(false);
  };

  const handleShowResults = () => {
    setSubmitted(true);
  };

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length;

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
          {QUESTIONS.map((q) => (
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
            {answeredCount === QUESTIONS.length
              ? "The Sorting Hat is deliberating… (results are a work in progress)."
              : `Answer all ${QUESTIONS.length} questions to see your house. (${answeredCount}/${QUESTIONS.length} answered)`}
          </p>
        )}
      </div>
    </div>
  );
}
