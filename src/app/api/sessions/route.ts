import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { startedAt } = await req.json()

  const session = await prisma.studySession.create({
    data: { startedAt: new Date(startedAt) },
  })

  return NextResponse.json({ id: session.id })
}
