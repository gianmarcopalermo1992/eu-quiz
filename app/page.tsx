export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          📘 EU Quiz
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Preparazione concorso
        </p>

        <div className="space-y-4">

          <button className="w-full rounded-xl bg-blue-600 text-white p-4 text-lg">
            ▶️ Inizia Quiz
          </button>

          <button className="w-full rounded-xl bg-green-600 text-white p-4 text-lg">
            📝 Modalità Esame
          </button>

          <button className="w-full rounded-xl bg-orange-500 text-white p-4 text-lg">
            ❌ Ripeti Errori
          </button>

          <button className="w-full rounded-xl bg-gray-700 text-white p-4 text-lg">
            📈 Statistiche
          </button>

        </div>

      </div>
    </main>
  );
}