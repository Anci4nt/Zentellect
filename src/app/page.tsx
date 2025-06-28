import Header from '@/components/Header'
import Timer from '@/components/Timer'

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Timer />
      </div>
    </main>
  )
}
