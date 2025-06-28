import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const sessions = await prisma.studySession.findMany({
    where: {
      startedAt: {
        gte: todayStart,
      },
    },
    orderBy: {
      startedAt: 'desc',
    },
  })

  const completedSessions = sessions.filter(s => s.endedAt)

  const totalSessions = completedSessions.length

  const totalTime = completedSessions.reduce((acc, session) => {
    return acc + (new Date(session.endedAt!).getTime() - new Date(session.startedAt).getTime())
  }, 0)

  const currentSession = sessions.find(s => !s.endedAt)

  const currentDuration = currentSession
    ? Date.now() - new Date(currentSession.startedAt).getTime()
    : 0

  return NextResponse.json({
    totalSessions,
    totalTime,
    currentDuration,
  })
}
