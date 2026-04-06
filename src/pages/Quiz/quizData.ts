import { EFaculty } from "../../enums/Faculties.enum";
import type { Faculty } from "../../types/Faculty.type";

export type QuizQuestion = {
  id: string;
  title: string;
  options: string[];
};

/** Option index maps to house (same order for every question). */
const OPTION_TO_FACULTY: EFaculty[] = [
  EFaculty.SLYTHERIN,
  EFaculty.GRYFFINDOR,
  EFaculty.RAVENCLAW,
  EFaculty.HUFFLEPUFF,
];

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

export const QUIZ_QUESTION_IDS = QUIZ_QUESTIONS.map((q) => q.id);

export function isQuizComplete(answers: Record<string, number>): boolean {
  return QUIZ_QUESTION_IDS.every((id) => answers[id] !== undefined);
}

export function computeFacultyFromAnswers(
  answers: Record<string, number>,
): EFaculty {
  const tally: Record<EFaculty, number> = {
    [EFaculty.GRYFFINDOR]: 0,
    [EFaculty.SLYTHERIN]: 0,
    [EFaculty.HUFFLEPUFF]: 0,
    [EFaculty.RAVENCLAW]: 0,
  };

  for (const id of QUIZ_QUESTION_IDS) {
    const idx = answers[id];
    if (idx === undefined || idx < 0 || idx > 3) continue;
    const house = OPTION_TO_FACULTY[idx];
    tally[house] += 1;
  }

  /** Deterministic tie-break when counts are equal. */
  const tieOrder: EFaculty[] = [
    EFaculty.GRYFFINDOR,
    EFaculty.SLYTHERIN,
    EFaculty.RAVENCLAW,
    EFaculty.HUFFLEPUFF,
  ];

  let winner = tieOrder[0];
  let best = -1;
  for (const f of tieOrder) {
    if (tally[f] > best) {
      best = tally[f];
      winner = f;
    }
  }
  return winner;
}

/** Display data aligned with `Faculties` page / FacultyCard (ids match `Faculties.tsx`). */
const FACULTY_CARD_ID: Record<EFaculty, number> = {
  [EFaculty.GRYFFINDOR]: 1,
  [EFaculty.SLYTHERIN]: 2,
  [EFaculty.HUFFLEPUFF]: 3,
  [EFaculty.RAVENCLAW]: 4,
};

export const FACULTY_RESULT_META: Record<
  EFaculty,
  { name: string; description: string; image: string }
> = {
  [EFaculty.GRYFFINDOR]: {
    name: "Gryffindor",
    description: "COURAGE, CHIVALPY,DARING.",
    image: "/src/assets/images/faculties/gryffindor.png",
  },
  [EFaculty.SLYTHERIN]: {
    name: "Slytherin",
    description: "AMBITION, CUNNING, RESOURCEFULNESS.",
    image: "/src/assets/images/faculties/slytherin.png",
  },
  [EFaculty.HUFFLEPUFF]: {
    name: "Hufflepuff",
    description: "WIT, LEARNING, WISDOM.",
    image: "/src/assets/images/faculties/hufflepuff.png",
  },
  [EFaculty.RAVENCLAW]: {
    name: "Ravenclaw",
    description: "LOYALTY, PATIENCE, HARD WORK.",
    image: "/src/assets/images/faculties/ravenclaw.png",
  },
};

export function getFacultyForCard(ef: EFaculty): Faculty {
  const m = FACULTY_RESULT_META[ef];
  return {
    id: FACULTY_CARD_ID[ef],
    name: m.name,
    image: m.image,
    description: m.description,
  };
}
