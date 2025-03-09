
import { useNavigate } from "react-router-dom";
import { Flame, User } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const streak = 0; // This will be dynamic later

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="font-display text-2xl font-bold text-primary"
            >
              DutchLingo
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 rounded-full">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">{streak}</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
