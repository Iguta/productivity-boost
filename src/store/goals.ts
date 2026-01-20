import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type GoalType = 'yearly' | 'monthly' | 'daily'

export type Goal = {
  id: string
  type: GoalType
  periodKey: string // e.g., '2026', '2026-01', '2026-01-20'
  text: string
  completed: boolean
}

function makePeriodKey(type: GoalType, date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  if (type === 'yearly') return `${y}`
  if (type === 'monthly') return `${y}-${m}`
  return `${y}-${m}-${d}`
}

let counter = 0
const id = () => `${Date.now()}-${counter++}`

export type GoalState = {
  goals: Goal[]
  addGoal: (type: GoalType, text: string, date?: Date) => Goal
  toggleGoal: (id: string) => void
  deleteGoal: (id: string) => void
  listForPeriod: (type: GoalType, date?: Date) => Goal[]
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set, get) => ({
      goals: [],
      addGoal: (type, text, date) => {
        const g: Goal = { id: id(), type, periodKey: makePeriodKey(type, date), text: text.trim(), completed: false }
        set((s) => ({ goals: [g, ...s.goals] }))
        return g
      },
      toggleGoal: (goalId) => set((s) => ({ goals: s.goals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g)) })),
      deleteGoal: (goalId) => set((s) => ({ goals: s.goals.filter((g) => g.id !== goalId) })),
      listForPeriod: (type, date) => {
        const key = makePeriodKey(type, date)
        return get().goals.filter((g) => g.type === type && g.periodKey === key)
      },
    }),
    { name: 'pb-goal-store' }
  )
)

export const GoalUtils = { makePeriodKey }
