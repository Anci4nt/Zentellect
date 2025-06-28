export default function Stats() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">🏆 Study Stats</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Sessions Completed Today</span>
          <span>0</span>
        </div>
        <div className="flex justify-between">
          <span>Current Session</span>
          <span>00:00</span>
        </div>
        <div className="flex justify-between">
          <span>Total Study Time Today</span>
          <span>00:00</span>
        </div>
      </div>
    </div>
  )
}
