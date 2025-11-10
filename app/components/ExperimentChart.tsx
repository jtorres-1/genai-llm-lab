"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ExperimentChartProps {
  experiments: any[]
}

export default function ExperimentChart({ experiments }: ExperimentChartProps) {
  if (!experiments || experiments.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No experiments yet to visualize.</p>
  }

  const data = experiments.map((exp) => ({
    name: `#${exp.id}`,
    WordCount: exp.metrics?.wordCount || 0,
    SentenceCount: exp.metrics?.sentenceCount || 0,
    Diversity: exp.metrics?.diversityScore || 0,
  }))

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Experiment Metrics Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="WordCount" fill="#3b82f6" />
          <Bar dataKey="SentenceCount" fill="#10b981" />
          <Bar dataKey="Diversity" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
