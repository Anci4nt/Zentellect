import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { endedAt } = await req.json()

    const session = await prisma.studySession.update({
      where: { id: Number(params.id) },
      data: { endedAt: new Date(endedAt) },
    })

    return NextResponse.json({ session })
  } catch (err) {
    console.error('Error ending session:', err)
    return NextResponse.json({ error: 'Failed to end session' }, { status: 500 })
  }
}
