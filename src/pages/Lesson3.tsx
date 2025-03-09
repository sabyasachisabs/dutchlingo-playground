
import { useState } from "react";
import { Flashcard } from "../components/Flashcard";
import { Palette } from "lucide-react";

const flashcards = [
  { front: "rood", back: "red", icon: Palette },
  { front: "oranje", back: "orange", icon: Palette },
  { front: "geel", back: "yellow", icon: Palette },
  { front: "groen", back: "green", icon: Palette },
  { front: "blauw", back: "blue", icon: Palette },
  { front: "indigo", back: "indigo", icon: Palette },
  { front: "violet", back: "violet", icon: Palette },
];

const Lesson3 = () => {
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
        Lesson 3: Colors of the Rainbow
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

export default Lesson3;
