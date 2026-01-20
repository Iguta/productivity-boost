import './index.css'
import { useState } from 'react'
import { TasksPage } from './pages/TasksPage'
import { GoalsPage } from './pages/GoalsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Bars3Icon, CheckCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline'

type TabKey = 'dashboard' | 'tasks' | 'goals'

function App() {
  const [tab, setTab] = useState<TabKey>('dashboard')
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bars3Icon className="w-6 h-6 text-brand-600" />
            <span className="font-semibold text-lg">Productivity Boost</span>
          </div>
          <nav className="flex items-center gap-2">
            <button className={`px-3 py-2 rounded-md text-sm font-medium ${tab==='dashboard'?'bg-brand-600 text-white':'hover:bg-gray-100'}`} onClick={()=>setTab('dashboard')}>
              <span className="inline-flex items-center gap-1"><ChartBarIcon className="w-4 h-4"/> Dashboard</span>
            </button>
            <button className={`px-3 py-2 rounded-md text-sm font-medium ${tab==='tasks'?'bg-brand-600 text-white':'hover:bg-gray-100'}`} onClick={()=>setTab('tasks')}>
              <span className="inline-flex items-center gap-1"><CheckCircleIcon className="w-4 h-4"/> Tasks</span>
            </button>
            <button className={`px-3 py-2 rounded-md text-sm font-medium ${tab==='goals'?'bg-brand-600 text-white':'hover:bg-gray-100'}`} onClick={()=>setTab('goals')}>
              Goals
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === 'dashboard' && <DashboardPage />}
        {tab === 'tasks' && <TasksPage />}
        {tab === 'goals' && <GoalsPage />}
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">Made for you • Personal use</footer>
    </div>
  )
}

export default App
