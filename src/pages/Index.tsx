
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { LessonCard } from "@/components/LessonCard";

const lessons = [
  {
    id: 1,
    title: "Basic Phrases",
    description: "Learn essential Dutch greetings and phrases",
    completed: false,
  },
  {
    id: 2,
    title: "Numbers 1-10",
    description: "Master counting in Dutch",
    completed: false,
  },
  {
    id: 3,
    title: "Colors",
    description: "Learn the colors in Dutch",
    completed: false,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Welcome to DutchLingo
            </h1>
            <p className="text-lg text-gray-600">
              Start your Dutch learning journey today
            </p>
          </div>
          
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                completed={lesson.completed}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
