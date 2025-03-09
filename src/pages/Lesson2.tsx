
import { useState } from "react";
import { Flashcard } from "../components/Flashcard";
import { Calculator } from "lucide-react";

const flashcards = [
  { front: "één", back: "one", icon: Calculator },
  { front: "twee", back: "two", icon: Calculator },
  { front: "drie", back: "three", icon: Calculator },
  { front: "vier", back: "four", icon: Calculator },
  { front: "vijf", back: "five", icon: Calculator },
  { front: "zes", back: "six", icon: Calculator },
  { front: "zeven", back: "seven", icon: Calculator },
  { front: "acht", back: "eight", icon: Calculator },
  { front: "negen", back: "nine", icon: Calculator },
  { front: "tien", back: "ten", icon: Calculator },
];

const Lesson2 = () => {
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
        Lesson 2: Numbers 1-10
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

export default Lesson2;
