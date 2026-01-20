import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export type Priority = 1 | 2 | 3 | 4 | 5

export type Task = {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: Priority
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TaskInput = {
  title: string
  description?: string
  dueDate?: string
  priority?: Priority
}

export type TaskFilters = {
  query: string
  sortBy: 'priority' | 'dueDate' | 'createdAt'
  showCompleted: boolean
}

const defaultFilters: TaskFilters = {
  query: '',
  sortBy: 'priority',
  showCompleted: true,
}

function createTask(input: TaskInput): Task {
  const now = new Date().toISOString()
  return {
    id: nanoid(),
    title: input.title.trim(),
    description: input.description?.trim() || '',
    dueDate: input.dueDate || undefined,
    priority: input.priority ?? 3,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}

function sortTasks(tasks: Task[], sortBy: TaskFilters['sortBy']): Task[] {
  const sorted = [...tasks]
  if (sortBy === 'priority') {
    sorted.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority
      const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
      const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
      return ad - bd
    })
  } else if (sortBy === 'dueDate') {
    sorted.sort((a, b) => {
      const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
      const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
      return ad - bd
    })
  } else {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  return sorted
}

export type TaskState = {
  tasks: Task[]
  filters: TaskFilters
  addTask: (input: TaskInput) => Task
  updateTask: (id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  toggleComplete: (id: string) => void
  deleteTask: (id: string) => void
  setFilters: (f: Partial<TaskFilters>) => void
  getFiltered: () => Task[]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      filters: defaultFilters,
      addTask: (input) => {
        const t = createTask(input)
        set((s) => ({ tasks: [t, ...s.tasks] }))
        return t
      },
      updateTask: (id, changes) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, ...changes, updatedAt: new Date().toISOString() } : t
          ),
        })),
      toggleComplete: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id
              ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
              : t
          ),
        })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      getFiltered: () => {
        const { tasks, filters } = get()
        const q = filters.query.trim().toLowerCase()
        let visible = tasks.filter((t) =>
          q
            ? t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
            : true
        )
        if (!filters.showCompleted) visible = visible.filter((t) => !t.completed)
        return sortTasks(visible, filters.sortBy)
      },
    }),
    { name: 'pb-task-store' }
  )
)

export const TaskUtils = { sortTasks }
