import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px]">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          EU Quiz
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Preparazione concorso
        </p>

        <Link href="/quiz">
          <button className="w-full bg-blue-600 text-white p-4 rounded-xl mb-4 hover:bg-blue-700">
            ▶️ Inizia Quiz
          </button>
        </Link>

        <button className="w-full bg-green-600 text-white p-4 rounded-xl mb-4">
          📝 Modalità Esame
        </button>

        <button className="w-full bg-orange-500 text-white p-4 rounded-xl mb-4">
          ❌ Ripeti Errori
        </button>

        <button className="w-full bg-gray-900 text-white p-4 rounded-xl">
          📊 Statistiche
        </button>

      </div>
    </main>
  );
}

