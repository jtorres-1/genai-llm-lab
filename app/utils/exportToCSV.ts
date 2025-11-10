export function exportToCSV(experiments: any[]) {
    if (!experiments || experiments.length === 0) return
  
    const headers = [
      "ID",
      "Prompt",
      "Temperature",
      "Top_P",
      "WordCount",
      "SentenceCount",
      "AvgSentenceLength",
      "Completeness",
      "PunctuationCount",
      "DiversityScore",
      "CreatedAt"
    ]
  
    const rows = experiments.map(exp => [
      exp.id,
      `"${exp.prompt.replace(/"/g, '""')}"`,
      exp.temperature,
      exp.top_p,
      exp.metrics?.wordCount ?? "",
      exp.metrics?.sentenceCount ?? "",
      exp.metrics?.avgSentenceLength ?? "",
      exp.metrics?.completeness ?? "",
      exp.metrics?.punctuationCount ?? "",
      exp.metrics?.diversityScore ?? "",
      exp.createdAt
    ])
  
    const csvContent =
      [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "llm_experiments.csv"
    link.click()
  }
  