type QuestionCardProps = {
  question: string;
};

const options = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Ni de acuerdo ni en desacuerdo",
  "De acuerdo",
  "Totalmente de acuerdo",
];

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <p className="mb-5 font-semibold text-gray-900 text-base">{question}</p>
      <form className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name={question}
              value={option}
              className="accent-red-600 w-4 h-4"
            />
            <span className="text-sm text-gray-800">{option}</span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default QuestionCard;
