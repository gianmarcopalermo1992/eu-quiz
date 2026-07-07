"use client";

import { useEffect, useState } from "react";
import questions from "../data/questions.json";

type Question = (typeof questions)[number];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const shuffled = shuffle(questions);
    setQuizQuestions(shuffled);
    setAnswers(Array(shuffled.length).fill(null));
  }, []);

  if (quizQuestions.length === 0) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Caricamento...</h1>
      </main>
    );
  }

  if (current >= quizQuestions.length) {
    const score = answers.reduce((total, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? total + 1 : total;
    }, 0);

    return (
      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">
          🎉 Quiz terminato!
        </h1>

        <p className="text-2xl mb-8">
          Hai risposto correttamente a{" "}
          <span className="font-bold">{score}</span> domande su{" "}
          <span className="font-bold">{quizQuestions.length}</span>.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Rifai il quiz
        </button>
      </main>
    );
  }

  const q = quizQuestions[current];
  const selected = answers[current];

  const score = answers.reduce<number>((total, answer, index) => {
    return answer === quizQuestions[index]?.correctAnswer ? total + 1 : total;
  }, 0);

  function answer(index: number) {
    if (selected !== null) return;

    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  }

  function previous() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function next() {
    if (current < quizQuestions.length) {
      setCurrent(current + 1);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((current + 1) / quizQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h2 className="text-sm text-gray-500">
        Domanda {current + 1} / {quizQuestions.length}
      </h2>

      <h1 className="text-2xl font-bold mt-4 mb-8">
        {q.question}
      </h1>

      <div className="flex flex-col gap-4">
        {q.options.map((option, i) => {
          let color = "bg-gray-100 hover:bg-gray-200";

          if (selected !== null) {
            if (i === q.correctAnswer) {
              color = "bg-green-400";
            } else if (i === selected) {
              color = "bg-red-400";
            }
          }

          return (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={selected !== null}
              className={`${color} rounded-xl p-4 text-left transition`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-6">
          {selected === q.correctAnswer ? (
            <div className="rounded-xl border border-green-300 bg-green-100 p-4 text-green-800 font-semibold">
              ✅ Risposta corretta!
            </div>
          ) : (
            <div className="rounded-xl border border-red-300 bg-red-100 p-4 text-red-800 font-semibold">
              ❌ Risposta errata.
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={previous}
          disabled={current === 0}
          className="flex-1 rounded-xl bg-gray-600 py-4 text-white disabled:opacity-40"
        >
          ← Domanda precedente
        </button>

        <button
          onClick={next}
          className="flex-1 rounded-xl bg-blue-600 py-4 text-white hover:bg-blue-700"
        >
          {current === quizQuestions.length - 1
            ? "Termina il quiz"
            : "Prossima domanda →"}
        </button>
      </div>

      <div className="mt-8 flex justify-between text-sm text-gray-500">
        <span>
          Avanzamento:{" "}
          {Math.round(((current + 1) / quizQuestions.length) * 100)}%
        </span>

        <span>
          Punteggio: {score} / {quizQuestions.length}
        </span>
      </div>
    </main>
  );
}
