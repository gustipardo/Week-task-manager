import { create } from 'zustand'
import { type WeekTasks } from '../types.d'

interface State {
  WeekUserTasksSelected: WeekTasks[]
  fetchUserTasks: () => void
}

export const useUserTaskStore = create<State>((set) => {
  return {
    WeekUserTasksSelected: [],

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchUserTasks: async () => {
      const res = await fetch('http://localhost:5173/WeekTasks.json')
      const json = await res.json()
      set({ WeekUserTasksSelected: json })
    }
  }
}
)
