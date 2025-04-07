import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuestionCard from "./components/QuestionCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          <QuestionCard question="1. ¿Cuál es tu opinión sobre la diversidad sexual?" />
          <QuestionCard question="1. ¿Cuál es tu opinión sobre la diversidad sexual?" />
          <QuestionCard question="1. ¿Cuál es tu opinión sobre la diversidad sexual?" />
          <QuestionCard question="1. ¿Cuál es tu opinión sobre la diversidad sexual?" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
