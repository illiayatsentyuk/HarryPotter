import { EFaculty } from "../../enums/Faculties.enum";
import type { Faculty } from "../../types/Faculty.type";
import type { QuizQuestion } from "../../types/quiz.type";
import { FACULTIES_LIST } from "../Faculties/facultiesList";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
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

/**
 * Returns the faculty card when every question is answered; otherwise `null`.
 * Option index 0–3 maps to Slytherin, Gryffindor, Ravenclaw, Hufflepuff; ties use that order for the winner.
 */
export function facultyFromQuizAnswers(
  answers: Record<string, number>,
): Faculty | null {
  if (answers["q1"] === undefined) return null;
  if (answers["q2"] === undefined) return null;
  if (answers["q3"] === undefined) return null;
  if (answers["q4"] === undefined) return null;
  if (answers["q5"] === undefined) return null;
  if (answers["q6"] === undefined) return null;

  let g = 0;
  let s = 0;
  let r = 0;
  let h = 0;

  let idx = answers["q1"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  idx = answers["q2"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  idx = answers["q3"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  idx = answers["q4"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  idx = answers["q5"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  idx = answers["q6"];
  if (idx === 0) {
    s += 1;
  } else if (idx === 1) {
    g += 1;
  } else if (idx === 2) {
    r += 1;
  } else if (idx === 3) {
    h += 1;
  }

  let winner = EFaculty.GRYFFINDOR;
  let best = g;
  if (s > best) {
    best = s;
    winner = EFaculty.SLYTHERIN;
  }
  if (r > best) {
    best = r;
    winner = EFaculty.RAVENCLAW;
  }
  if (h > best) {
    best = h;
    winner = EFaculty.HUFFLEPUFF;
  }

  if (winner === EFaculty.GRYFFINDOR) {
    return FACULTIES_LIST[0];
  } else if (winner === EFaculty.SLYTHERIN) {
    return FACULTIES_LIST[1];
  } else if (winner === EFaculty.HUFFLEPUFF) {
    return FACULTIES_LIST[2];
  } else {
    return FACULTIES_LIST[3];
  }
}
