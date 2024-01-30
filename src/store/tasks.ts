import { create } from 'zustand'
import { type Day, type task_letter, type WeekTasks } from '../types.d'

interface State {
  WeekUserTasksSelected: WeekTasks[]
  fetchUserTasks: () => void
  addUserTask: (day: Day, letter: task_letter) => void
}

export const useUserTaskStore = create<State>((set, get) => {
  return {
    WeekUserTasksSelected: [],

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchUserTasks: async () => {
      const res = await fetch('http://localhost:5173/WeekTasks.json')
      const json = await res.json()
      set({ WeekUserTasksSelected: json })
    },
    addUserTask: (day: Day, letter: task_letter) => {
      const { WeekUserTasksSelected } = get()
      const newUserTasksSelected = structuredClone(WeekUserTasksSelected)
      const dayIndex = newUserTasksSelected.findIndex(item => item.day === day)
      const dayObject = newUserTasksSelected[dayIndex]

      dayObject.UserTasksSelected.push(letter)
      newUserTasksSelected[dayIndex] = dayObject

      set({ WeekUserTasksSelected: newUserTasksSelected })
    }
  }
}
)
