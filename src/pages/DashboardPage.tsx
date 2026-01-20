import { useTaskStore, type TaskState } from '../store/tasks'
import { useGoalStore, type GoalState } from '../store/goals'
import { taskProgress, goalProgress } from '../utils/progress'

function StatCard({ title, value, sub }: { title: string, value: string, sub?: string }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-4">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  )
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-brand-600" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function DashboardPage() {
  const tasks = useTaskStore((s: TaskState)=>s.tasks)
  const goals = useGoalStore((s: GoalState)=>s.goals)

  const now = new Date()
  const w = taskProgress(tasks, now, 'week')
  const m = taskProgress(tasks, now, 'month')
  const y = taskProgress(tasks, now, 'year')

  const gd = goalProgress(goals, 'daily', now)
  const gm = goalProgress(goals, 'monthly', now)
  const gy = goalProgress(goals, 'yearly', now)

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-semibold mb-3">Task Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <StatCard title="Weekly" value={`${w.pct}%`} sub={`${w.completed}/${w.total} completed`} />
            <ProgressBar pct={w.pct} />
          </div>
          <div className="space-y-2">
            <StatCard title="Monthly" value={`${m.pct}%`} sub={`${m.completed}/${m.total} completed`} />
            <ProgressBar pct={m.pct} />
          </div>
          <div className="space-y-2">
            <StatCard title="Yearly" value={`${y.pct}%`} sub={`${y.completed}/${y.total} completed`} />
            <ProgressBar pct={y.pct} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Goals Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <StatCard title="Daily" value={`${gd.pct}%`} sub={`${gd.completed}/${gd.total} completed`} />
            <ProgressBar pct={gd.pct} />
          </div>
          <div className="space-y-2">
            <StatCard title="Monthly" value={`${gm.pct}%`} sub={`${gm.completed}/${gm.total} completed`} />
            <ProgressBar pct={gm.pct} />
          </div>
          <div className="space-y-2">
            <StatCard title="Yearly" value={`${gy.pct}%`} sub={`${gy.completed}/${gy.total} completed`} />
            <ProgressBar pct={gy.pct} />
          </div>
        </div>
      </section>
    </div>
  )
}
