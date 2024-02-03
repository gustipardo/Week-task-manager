import { create } from 'zustand'
import { type Day, type task_letter, type WeekTasks } from '../types'
import { useDateStore } from './Dates'
import { formatearFecha } from '../services/FormatDate'

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
      const CurrentInitialDate = useDateStore.getState().CurrentInitialDate
      const CurrentInitialDateString = formatearFecha(CurrentInitialDate)
      const res = await fetch('http://localhost:5173/WeekInfo.json')
      const json = await res.json()
      const CurrentWeekInfo = json.WeeksInfo.find(((semana: { date: string }) => semana.date === CurrentInitialDateString))
      const CurrentWeekTasks = CurrentWeekInfo ? CurrentWeekInfo.WeekTasks : []
      console.log('currentTasks', CurrentWeekTasks)
      set({ WeekUserTasksSelected: CurrentWeekTasks })
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
