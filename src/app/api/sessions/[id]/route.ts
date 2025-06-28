import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { endedAt } = await req.json()

  const updated = await prisma.studySession.update({
    where: { id: parseInt(params.id) },
    data: { endedAt: new Date(endedAt) },
  })

  return NextResponse.json({ success: true })
}
