import QuestionCard from "../components/QuestionCard";

const Encuesta = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
      <QuestionCard question="1. ¿Cuál es tu opinión sobre la diversidad sexual?" />
      <QuestionCard question="2. ¿Te sentís libre de expresar tu identidad?" />
      <QuestionCard question="3. ¿Cómo te ha tratado tu entorno frente a tu orientación?" />
      <QuestionCard question="4. ¿Qué mejorarías en tu comunidad para incluir más?" />
    </div>
  );
};

export default Encuesta;