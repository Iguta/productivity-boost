import { describe, it, expect } from 'vitest'
import { taskProgress, goalProgress } from '../progress'
import type { Task } from '../../store/tasks'
import type { Goal } from '../../store/goals'

function iso(d: string) { return new Date(d).toISOString() }

describe('progress utils', () => {
  it('computes weekly task progress', () => {
    const when = new Date('2026-01-20T10:00:00Z')
    const tasks: Task[] = [
      { id: '1', title: 'a', priority: 3, completed: true, createdAt: iso('2026-01-19'), updatedAt: iso('2026-01-19') },
      { id: '2', title: 'b', priority: 3, completed: false, createdAt: iso('2026-01-20'), updatedAt: iso('2026-01-20') },
    ] as any
    const w = taskProgress(tasks, when, 'week')
    expect(w.total).toBe(2)
    expect(w.completed).toBe(1)
    expect(w.pct).toBe(50)
  })

  it('computes goal progress', () => {
    const when = new Date('2026-01-20T10:00:00Z')
    const goals: Goal[] = [
      { id: 'a', type: 'daily', periodKey: '2026-01-20', text: 'x', completed: true },
      { id: 'b', type: 'daily', periodKey: '2026-01-20', text: 'y', completed: false },
      { id: 'c', type: 'monthly', periodKey: '2026-01', text: 'z', completed: false },
    ]
    const d = goalProgress(goals as any, 'daily', when)
    const m = goalProgress(goals as any, 'monthly', when)
    expect(d.pct).toBe(50)
    expect(m.total).toBe(1)
  })
})
