interface Props {
  goal: number
  setGoal: (min: number) => void
}

export default function GoalSelector({ goal, setGoal }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">🎯 Session Goal</h3>
      <div className="flex items-center gap-4">
        <button onClick={() => setGoal(goal - 1)} className="bg-gray-100 px-3 py-1 rounded">-</button>
        <span className="text-xl font-medium">{goal}</span>
        <button onClick={() => setGoal(goal + 1)} className="bg-gray-100 px-3 py-1 rounded">+</button>
      </div>
      <div className="flex gap-2 mt-4">
        {[15, 25, 45].map((val) => (
          <button
            key={val}
            onClick={() => setGoal(val)}
            className={`px-4 py-2 rounded ${goal === val ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {val}m
          </button>
        ))}
      </div>
    </div>
  )
}
