import { describe, it, expect } from 'vitest'
import { useTaskStore, TaskUtils } from '../tasks'

describe('task store', () => {
  it('adds a task', () => {
    const t = useTaskStore.getState().addTask({ title: 'Test', description: 'desc', priority: 5 })
    const found = useTaskStore.getState().tasks.find(x => x.id === t.id)
    expect(found?.title).toBe('Test')
    expect(found?.priority).toBe(5)
  })

  it('updates a task', () => {
    const t = useTaskStore.getState().addTask({ title: 'Old' })
    useTaskStore.getState().updateTask(t.id, { title: 'New' })
    expect(useTaskStore.getState().tasks.find(x => x.id === t.id)?.title).toBe('New')
  })

  it('deletes a task', () => {
    const t = useTaskStore.getState().addTask({ title: 'Delete me' })
    useTaskStore.getState().deleteTask(t.id)
    expect(useTaskStore.getState().tasks.find(x => x.id === t.id)).toBeUndefined()
  })

  it('searches and prioritizes tasks', () => {
    // reset store
    useTaskStore.setState({ tasks: [] as any, filters: { query: '', sortBy: 'priority', showCompleted: true } })
    useTaskStore.getState().addTask({ title: 'Alpha', priority: 1 })
    useTaskStore.getState().addTask({ title: 'Bravo', priority: 5 })
    useTaskStore.getState().addTask({ title: 'Charlie', priority: 3 })
    useTaskStore.getState().setFilters({ query: 'br' })
    const filtered = useTaskStore.getState().getFiltered()
    expect(filtered.length).toBe(1)
    expect(filtered[0].title).toBe('Bravo')

    useTaskStore.getState().setFilters({ query: '', sortBy: 'priority' })
    const sorted = useTaskStore.getState().getFiltered()
    expect(sorted[0].priority).toBeGreaterThanOrEqual(sorted[1].priority)
  })
})
