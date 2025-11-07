"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(0.9)
  const [experiments, setExperiments] = useState([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/experiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, temperature, top_p: topP }),
    })
    const data = await res.json()
    setExperiments(prev => [data, ...prev])
  }

  useEffect(() => {
    fetch("/api/experiment")
      .then(res => res.json())
      .then(data => setExperiments(data))
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        LLM Lab Console
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded-lg shadow"
      >
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex gap-4">
          <label className="flex flex-col text-sm font-medium">
            Temperature
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
          <label className="flex flex-col text-sm font-medium">
            Top P
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={topP}
              onChange={e => setTopP(parseFloat(e.target.value))}
              className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Generate Response
        </button>
      </form>

      {/* Experiment Display */}
      <section className="mt-8 space-y-5">
        {experiments.map((exp: any) => (
          <div
            key={exp.id}
            className="border p-4 rounded-lg shadow-sm bg-white transition hover:shadow-md"
          >
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-gray-800">Prompt:</span>{" "}
              {exp.prompt}
            </p>
            <p className="text-gray-800 font-medium mb-2">{exp.response}</p>

            <div className="text-xs text-gray-500 mb-3">
              Temp: {exp.temperature} | Top P: {exp.top_p}
            </div>

            {/* Metrics Section */}
            {exp.metrics && (
              <div className="border-t pt-2 mt-2">
                <p className="font-semibold text-gray-800 mb-1">Metrics</p>
                <ul className="text-sm text-gray-700 grid grid-cols-2 gap-y-1">
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
      </section>
    </main>
  )
}
