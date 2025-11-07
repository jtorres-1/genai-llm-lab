import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { prompt, temperature, top_p } = await req.json()

    // temporary fake LLM response
    const response =
      `Fake LLM response for prompt: "${prompt}" at temp ${temperature}, top_p ${top_p}.`

    // simple starter metrics
    const wordCount = response.split(/\s+/).length
    const sentenceCount = response.split(/[.!?]+/).filter(Boolean).length
    const avgWordsPerSentence = sentenceCount ? wordCount / sentenceCount : wordCount

    const metrics = {
      wordCount,
      sentenceCount,
      avgWordsPerSentence,
    }

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

export async function GET() {
  const experiments = await prisma.experiment.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(experiments)
}
