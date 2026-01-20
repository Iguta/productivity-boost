import { useState } from 'react'
import { useTaskStore, type TaskInput, type Task } from '../store/tasks'
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

function TaskForm({ initial, onSubmit, onCancel }: { initial?: Partial<Task>, onSubmit: (input: TaskInput) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [dueDate, setDueDate] = useState(initial?.dueDate?.slice(0,10) ?? '')
  const [priority, setPriority] = useState<number>(initial?.priority ?? 3)
  return (
    <form className="space-y-3" onSubmit={(e)=>{e.preventDefault(); onSubmit({ title, description, dueDate: dueDate? new Date(dueDate).toISOString(): undefined, priority: priority as any })}}>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" value={title} onChange={(e)=>setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" value={description} onChange={(e)=>setDescription(e.target.value)} rows={3} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input type="date" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Priority (1-5)</label>
          <input type="number" min={1} max={5} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" value={priority} onChange={(e)=>setPriority(Number(e.target.value))} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="px-3 py-2 rounded-md border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="px-3 py-2 rounded-md bg-brand-600 text-white">Save</button>
      </div>
    </form>
  )
}

export function TasksPage() {
  const store = useTaskStore()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  const tasks = store.getFiltered()

  const handleCreate = (input: TaskInput) => {
    store.addTask(input)
    setShowForm(false)
  }

  const handleUpdate = (input: TaskInput) => {
    if (!editing) return
    store.updateTask(editing.id, {
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
      priority: (input.priority ?? 3) as any,
    })
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              placeholder="Search tasks..."
              value={store.filters.query}
              onChange={(e)=>store.setFilters({query: e.target.value})}
              className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="sr-only">Sort by</label>
            <select value={store.filters.sortBy} onChange={(e)=>store.setFilters({sortBy: e.target.value as any})} className="rounded-md border border-gray-300 px-2 py-2">
              <option value="priority">Priority</option>
              <option value="dueDate">Due date</option>
              <option value="createdAt">Created</option>
            </select>
          </div>
          <label className="ml-2 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={store.filters.showCompleted} onChange={(e)=>store.setFilters({showCompleted: e.target.checked})}/>
            Show completed
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>{setEditing(null); setShowForm(true)}} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-brand-600 text-white"><PlusIcon className="w-4 h-4"/> New Task</button>
        </div>
      </div>

      {(showForm && !editing) && (
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-3">Create Task</h3>
          <TaskForm onSubmit={handleCreate} onCancel={()=>setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-3">Edit Task</h3>
          <TaskForm initial={editing} onSubmit={handleUpdate} onCancel={()=>setEditing(null)} />
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tasks.map((t)=> (
          <li key={t.id} className="rounded-lg border bg-white shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={t.completed} onChange={()=>store.toggleComplete(t.id)} />
                  <h4 className="font-semibold line-clamp-1">{t.title}</h4>
                </div>
                {t.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{t.description}</p>}
                <div className="mt-2 text-xs text-gray-500 flex gap-3">
                  {t.dueDate && <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>}
                  <span>Priority: {t.priority}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-gray-100" onClick={()=>setEditing(t)}><PencilIcon className="w-4 h-4"/></button>
                <button className="p-2 rounded hover:bg-gray-100" onClick={()=>store.deleteTask(t.id)}><TrashIcon className="w-4 h-4"/></button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-16">
          <p>No tasks found. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}
