"use client"
import { useState, useEffect } from "react"
import ExperimentChart from "./components/ExperimentChart"
import { exportToCSV } from "./utils/exportToCSV"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(0.9)
  const [experiments, setExperiments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    const res = await fetch("/api/experiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, temperature, top_p: topP }),
    })
    const data = await res.json()
    setExperiments(prev => [data, ...prev])
    setLoading(false)
    setPrompt("")
  }

  useEffect(() => {
    fetch("/api/experiment")
      .then(res => res.json())
      .then(data => setExperiments(data))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f172a] to-[#020617] text-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-12 relative">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Header */}
        <header className="text-center animate-fade-in relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            LLM Lab Console
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experiment with <span className="text-blue-400 font-medium">temperature</span> and{" "}
            <span className="text-purple-400 font-medium">top-p</span> to analyze model behavior patterns.
          </p>
        </header>

        {/* Experiment Form */}
        <section className="bg-[#111827]/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_0_25px_rgba(59,130,246,0.1)] border border-blue-900/30 hover:border-blue-500/40 transition duration-300 relative z-10">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">
            Generate New Experiment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="w-full p-4 bg-[#0a0f1f] text-gray-100 border border-gray-700/60 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows={4}
            />

            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex-1 flex flex-col text-sm font-medium text-gray-300">
                Temperature
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  className="bg-[#0a0f1f] mt-1 p-2 text-white border border-gray-700/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
              <label className="flex-1 flex flex-col text-sm font-medium text-gray-300">
                Top P
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={topP}
                  onChange={e => setTopP(parseFloat(e.target.value))}
                  className="bg-[#0a0f1f] mt-1 p-2 text-white border border-gray-700/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                loading
                  ? "bg-gradient-to-r from-blue-900 to-purple-900 opacity-60 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  Generating...
                </span>
              ) : (
                "Generate Response"
              )}
            </button>
          </form>
        </section>

        {/* Experiment Results */}
        <section className="animate-fade-in relative z-10">
          <h2 className="text-2xl font-semibold text-purple-300 mb-5 border-b border-gray-700 pb-2">
            Experiment History
          </h2>

          <div className="space-y-6">
            {experiments.map((exp: any, idx) => (
              <div
                key={exp.id || idx}
                className="bg-[#0f172a]/70 border border-gray-700/60 p-6 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(147,51,234,0.25)] transition-all duration-300 animate-fade-in"
              >
                <p className="text-sm text-gray-400 mb-2">
                  <span className="font-semibold text-gray-200">Prompt:</span>{" "}
                  {exp.prompt}
                </p>
                <p className="text-gray-100 leading-relaxed mb-3 text-[15px]">
                  {exp.response}
                </p>

                <div className="text-xs text-gray-500 mb-3 italic">
                  Temp: {exp.temperature} | Top P: {exp.top_p}
                </div>

                {exp.metrics && (
                  <div className="border-t border-gray-700/60 pt-3 mt-3">
                    <p className="font-semibold text-gray-300 mb-2 text-sm">
                      Metrics
                    </p>
                    <ul className="text-sm text-gray-400 grid grid-cols-2 sm:grid-cols-3 gap-y-1">
                      <li>Word Count: {exp.metrics.wordCount}</li>
                      <li>Sentence Count: {exp.metrics.sentenceCount}</li>
                      <li>Avg Sentence: {exp.metrics.avgSentenceLength}</li>
                      <li>Completeness: {exp.metrics.completeness}%</li>
                      <li>Punctuation: {exp.metrics.punctuationCount}</li>
                      <li>Diversity: {exp.metrics.diversityScore}%</li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Chart Section */}
        <section className="bg-[#111827]/70 p-8 rounded-2xl border border-gray-700/60 shadow-[0_0_30px_rgba(147,51,234,0.15)] animate-fade-in relative z-10">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Metrics Visualization
          </h2>
          <ExperimentChart experiments={experiments} />
        </section>

        {/* Export Button */}
        <div className="flex justify-center relative z-10">
          <button
            onClick={() => exportToCSV(experiments)}
            className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 px-6 rounded-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-200 font-semibold text-lg"
          >
            Download Results (CSV)
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-16 border-t border-gray-800 pt-4 relative z-10">
          © 2025 <span className="text-blue-400">LLM Lab</span> • Built by Jesse Torres
        </footer>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
      `}</style>
    </main>
  )
}
