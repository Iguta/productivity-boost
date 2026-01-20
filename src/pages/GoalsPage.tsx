import { useGoalStore, type GoalType } from '../store/goals'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

function GoalList({ type, label }: { type: GoalType, label: string }) {
  const goalsStore = useGoalStore()
  const [text, setText] = useState('')
  const goals = goalsStore.listForPeriod(type)
  const add = () => {
    if (!text.trim()) return
    goalsStore.addGoal(type, text)
    setText('')
  }
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b px-4 py-3 font-semibold">{label}</div>
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <input value={text} onChange={(e)=>setText(e.target.value)} placeholder={`Add ${label.toLowerCase()}...`}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"/>
          <button onClick={add} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand-600 text-white"><PlusIcon className="w-4 h-4"/>Add</button>
        </div>
        <ul className="space-y-2">
          {goals.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-3">
              <label className="flex-1 inline-flex items-center gap-2">
                <input type="checkbox" checked={g.completed} onChange={()=>goalsStore.toggleGoal(g.id)} />
                <span className={g.completed ? 'line-through text-gray-500' : ''}>{g.text}</span>
              </label>
              <button className="p-2 rounded hover:bg-gray-100" onClick={()=>goalsStore.deleteGoal(g.id)}><TrashIcon className="w-4 h-4"/></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function GoalsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GoalList type="daily" label="Daily Goals"/>
      <GoalList type="monthly" label="Monthly Goals"/>
      <GoalList type="yearly" label="Yearly Resolutions"/>
    </div>
  )
}
