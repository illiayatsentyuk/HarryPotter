export type QuizQuestion = {
  id: string;
  title: string;
  options: string[];
};

export type QuizResultLocationState = {
  answers?: Record<string, number>;
};
