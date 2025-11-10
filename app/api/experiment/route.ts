import OpenAI from "openai"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ===========================================
// QUALITY METRIC ANALYSIS FUNCTION
// ===========================================
function analyzeResponse(response: string, prompt: string) {
  const sentences = response.split(/[.!?]/).filter(Boolean)
  const words = response.split(/\s+/).filter(Boolean)

  const avgSentenceLength =
    sentences.length > 0 ? words.length / sentences.length : 0

  const completeness = Math.min(
    (response.length / (prompt.length * 3)) * 100,
    100
  )

  const punctuationCount = (response.match(/[,.!?;]/g) || []).length
  const uniqueWords = new Set(words.map(w => w.toLowerCase()))
  const diversityScore = parseFloat(
    ((uniqueWords.size / words.length) * 100).toFixed(1)
  )

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgSentenceLength: parseFloat(avgSentenceLength.toFixed(2)),
    completeness: parseFloat(completeness.toFixed(1)),
    punctuationCount,
    diversityScore,
  }
}

// ===========================================
// POST ROUTE — CREATE NEW EXPERIMENT
// ===========================================
export async function POST(req: Request) {
  try {
    const { prompt, temperature, top_p } = await req.json()

    // Call OpenAI API for real response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature,
      top_p,
    })

    // Safely extract response text
    const response =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "(No content returned — possibly timed out at high temperature.)"

    // If OpenAI returned nothing, respond gracefully
    if (!response || response.length < 5) {
      console.warn("OpenAI returned empty response.")
      return new Response(
        JSON.stringify({ error: "Empty or invalid response from OpenAI." }),
        { status: 502 }
      )
    }

    // Analyze response quality
    const metrics = analyzeResponse(response, prompt)

    // Save experiment to DB
    const experiment = await prisma.experiment.create({
      data: {
        prompt,
        temperature,
        top_p,
        response,
        metrics,
      },
    })

    return Response.json(experiment)
  } catch (err) {
    console.error("Error in POST /api/experiment:", err)
    return new Response(
      JSON.stringify({ error: "Failed to generate or save experiment" }),
      { status: 500 }
    )
  }
}

// ===========================================
// GET ROUTE — FETCH ALL EXPERIMENTS
// ===========================================
export async function GET() {
  const experiments = await prisma.experiment.findMany({
    orderBy: { createdAt: "desc" },
  })
  return Response.json(experiments)
}
