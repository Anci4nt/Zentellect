const [sessionId, setSessionId] = useState<number | null>(null)

const startTimer = async () => {
  if (!hasStarted) {
    setTimeLeft(goal * 60)
    setHasStarted(true)
  }
  setIsRunning(true)

  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startedAt: new Date().toISOString() }),
  })
  const data = await res.json()
  setSessionId(data.id)
}

const stopTimer = async () => {
  setIsRunning(false)

  if (sessionId) {
    await fetch(`/api/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endedAt: new Date().toISOString() }),
    })
    setSessionId(null)
  }
}
