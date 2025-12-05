// src/components/quiz/QuizQuestion.jsx
import React from "react";

const QuizQuestion = ({ q, index, selected, onSelect }) => {
  return (
    <div className="mb-6 p-4 border rounded">
      <h3 className="font-semibold text-lg">
        {index + 1}. {q.question}
      </h3>

      <div className="mt-3">
        {q.options.map((opt, i) => (
          <label key={i} className="block mb-2">
            <input
              type="radio"
              name={`q-${index}`}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(index, opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
