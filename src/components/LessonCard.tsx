
import { Book, CheckCircle } from "lucide-react";

interface LessonCardProps {
  title: string;
  description: string;
  completed?: boolean;
  onClick: () => void;
}

export const LessonCard = ({ title, description, completed, onClick }: LessonCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Book className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-display text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {completed && (
          <CheckCircle className="h-6 w-6 text-secondary" />
        )}
      </div>
    </button>
  );
};
