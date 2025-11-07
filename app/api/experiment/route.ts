import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ===========================================
// QUALITY METRIC ANALYSIS FUNCTION
// ===========================================
function analyzeResponse(response: string, prompt: string) {
  const sentences = response.split(/[.!?]/).filter(Boolean)
  const words = response.split(/\s+/).filter(Boolean)

  // Sentence and word structure
  const avgSentenceLength =
    sentences.length > 0 ? words.length / sentences.length : 0

  // Completeness: how long the response is compared to the prompt
  const completeness = Math.min(
    (response.length / (prompt.length * 3)) * 100,
    100
  )

  // Punctuation and structure
  const punctuationCount = (response.match(/[,.!?;]/g) || []).length

  // Token diversity: how repetitive the word usage is
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()))
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

    // temporary fake LLM response
    const response = `Fake LLM response for prompt: "${prompt}" at temp ${temperature}, top_p ${top_p}.`

    // run metric analysis
    const metrics = analyzeResponse(response, prompt)

    // save to database
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
    console.error('Error in POST /api/experiment', err)
    return new Response(JSON.stringify({ error: 'Failed to save experiment' }), {
      status: 500,
    })
  }
}

// ===========================================
// GET ROUTE — FETCH ALL EXPERIMENTS
// ===========================================
export async function GET() {
  const experiments = await prisma.experiment.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(experiments)
}
