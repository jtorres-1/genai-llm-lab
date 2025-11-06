import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { prompt, temperature, top_p, response, metrics } = await req.json()
    const experiment = await prisma.experiment.create({
      data: { prompt, temperature, top_p, response, metrics },
    })
    return NextResponse.json(experiment)
  } catch (error) {
    console.error('Error saving experiment:', error)
    return NextResponse.json({ error: 'Failed to save experiment' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const experiments = await prisma.experiment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(experiments)
  } catch (error) {
    console.error('Error fetching experiments:', error)
    return NextResponse.json({ error: 'Failed to fetch experiments' }, { status: 500 })
  }
}
