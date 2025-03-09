
import { useState } from "react";
import { Flashcard } from "../components/Flashcard";

const flashcards = [
  { front: "Hallo", back: "Hello" },
  { front: "Dag", back: "Goodbye" },
  { front: "Dank je wel", back: "Thank you" },
  { front: "Alstublieft", back: "Please" },
  { front: "Ja", back: "Yes" },
  { front: "Nee", back: "No" },
];

const Lesson1 = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 text-center mb-8">
        Lesson 1: Basic Greetings
      </h1>
      <div className="mb-8">
        <Flashcard {...flashcards[currentCardIndex]} />
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={prevCard}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Next
        </button>
      </div>
      <p className="text-center mt-4 text-gray-500">
        Card {currentCardIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
};

export default Lesson1;
