export interface Card {
    id: string;
    question: string;
    answer: string;
    description?: string;
    tag: string;
    column: string;
    showAnswer?: boolean;  // Ajoutez cette ligne pour inclure la propriété showAnswer
  }
  