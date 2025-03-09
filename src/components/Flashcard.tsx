
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FlashcardProps {
  front: string;
  back: string;
  icon?: LucideIcon;
}

export const Flashcard = ({ front, back, icon: Icon = BookOpen }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer w-full max-w-xl mx-auto perspective-1000"
    >
      <div
        className={`relative w-full h-64 transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4 ${
            isFlipped ? "invisible" : ""
          }`}
        >
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-display text-gray-900">{front}</p>
          <p className="text-sm text-gray-500">Click to reveal translation</p>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-4 rotate-y-180 ${
            !isFlipped ? "invisible" : ""
          }`}
        >
          <div className="p-3 bg-secondary/10 rounded-lg">
            <Icon className="h-6 w-6 text-secondary" />
          </div>
          <p className="text-2xl font-display text-gray-900">{back}</p>
          <p className="text-sm text-gray-500">Click to flip back</p>
        </div>
      </div>
    </div>
  );
};
