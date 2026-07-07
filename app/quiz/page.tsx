"use client";

import { useState } from "react";
import questions from "../data/questions.json";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[current];

  function answer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === q.correctAnswer) {
      setScore(score + 1);
    }
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  if (!q) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold">Quiz terminato!</h1>

        <p className="mt-4 text-xl">
          Hai risposto correttamente a {score} domande su {questions.length}.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h2 className="text-sm text-gray-500">
        Domanda {current + 1} / {questions.length}
      </h2>

      <h1 className="text-2xl font-bold mt-4">
        {q.question}
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        {q.options.map((option, i) => {
          let color = "bg-gray-100";

          if (selected !== null) {
            if (i === q.correctAnswer) color = "bg-green-400";
            else if (i === selected) color = "bg-red-400";
          }

          return (
            <button
              key={i}
              onClick={() => answer(i)}
              className={`${color} p-4 rounded-lg text-left hover:opacity-90`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={next}
          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700"
        >
          Prossima domanda →
        </button>
      )}
    </main>
  );
}
