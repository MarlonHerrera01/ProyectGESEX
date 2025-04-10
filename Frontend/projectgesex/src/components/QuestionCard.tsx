type QuestionCardProps = {
    question: string;
  };
  
  const options = [
    "Muy positiva",
    "Positiva",
    "Neutral",
    "Negativa",
    "Muy negativa",
  ];
  
  const QuestionCard = ({ question }: QuestionCardProps) => {
    return (
      <div className="border rounded-md p-4 shadow-md w-full max-w-md">
        <p className="mb-4">{question}</p>
        <form className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="radio" name={question} value={option} />
              {option}
            </label>
          ))}
        </form>
      </div>
    );
  };
  
  export default QuestionCard;