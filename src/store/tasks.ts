import { create } from 'zustand'

export const useTaskStore = create(set,get) => {
    return (
        tasks: [],

        fetchTasks: async () => {
            const res = await fetch('http://localhost:5173/week_task.json')
        }
    )
}
