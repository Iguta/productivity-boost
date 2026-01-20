import { isSameWeek, isSameMonth, isSameYear, parseISO } from 'date-fns'
import type { Task } from '../store/tasks'
import type { Goal, GoalType } from '../store/goals'

export function taskProgress(tasks: Task[], when: Date, granularity: 'week' | 'month' | 'year') {
  const filterBy = (t: Task) => {
    const date = t.dueDate ? parseISO(t.dueDate) : parseISO(t.createdAt)
    if (granularity === 'week') return isSameWeek(date, when, { weekStartsOn: 1 })
    if (granularity === 'month') return isSameMonth(date, when)
    return isSameYear(date, when)
  }
  const scoped = tasks.filter(filterBy)
  const total = scoped.length || 0
  const completed = scoped.filter((t) => t.completed).length
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, pct }
}

export function goalProgress(goals: Goal[], type: GoalType, when: Date) {
  const key = ((): string => {
    const y = when.getFullYear()
    const m = String(when.getMonth() + 1).padStart(2, '0')
    const d = String(when.getDate()).padStart(2, '0')
    if (type === 'yearly') return `${y}`
    if (type === 'monthly') return `${y}-${m}`
    return `${y}-${m}-${d}`
  })()
  const scoped = goals.filter((g) => g.type === type && g.periodKey === key)
  const total = scoped.length || 0
  const completed = scoped.filter((g) => g.completed).length
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, pct }
}

