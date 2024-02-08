import { create } from 'zustand'
import { type task_letter, type WeekInfo, type Day, type Goal, type InitialDate } from '../types.d'
import { persist } from 'zustand/middleware'
import { getMondayAndSundayString } from '../services/CurrentWeek'
import { getCurrentWeekInfo } from '../services/CurrentWeekInfo'

interface State {
  WeeksInfo: WeekInfo[]
  CurrentInitialDate: InitialDate
  GoalsLetters: task_letter[]
  addNewTask: (day: Day, letter: task_letter) => void
  addNewGoal: (goal: Goal, letter: task_letter) => void
  getGoalsLetters: () => void
  CurrentMondayString: string
  CurrentSundayString: string
  deleteGoal: () => void
  goNextWeek: (isNext?: boolean) => void
  hola: string[]
  fetchHola: () => void
  fetchWeeksInfo: () => void
}

export const useWeekInfoStore = create<State>()(persist((set, get) => {
  const today = new Date()
  const { FirstDay, LastDay, FirstDate } = getMondayAndSundayString(today)
  const hola = ['hoaala', 'chau']
  return {
    hola: [],
    WeeksInfo: [],
    CurrentInitialDate: FirstDate,
    CurrentMondayString: FirstDay,
    CurrentSundayString: LastDay,
    GoalsLetters: [],

    fetchHola: () => {
      set({ hola })
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchWeeksInfo: async () => {
      const res = await fetch('http://localhost:5173/WeekInfo.json')
      const json = await res.json()

      set({ WeeksInfo: json })
    },
    // addNewWeek: () => {

    // },
    addNewTask: (day: Day, letter: task_letter) => {
      const { WeeksInfo, CurrentInitialDate } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekInfo, CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentInitialDate)
      if (CurrentWeekInfo === undefined) return
      const dayIndex = CurrentWeekInfo.WeekTasks.findIndex(item => item.day === day)
      const dayObject = CurrentWeekInfo.WeekTasks[dayIndex]

      dayObject.UserTasksSelected.push(letter)
      CurrentWeekInfo.WeekTasks[dayIndex] = dayObject
      newWeeksInfo[CurrentWeekIndex] = CurrentWeekInfo
      set({ WeeksInfo: newWeeksInfo })
    },
    addNewGoal: (goal: Goal, letter: task_letter) => {
      const { WeeksInfo, CurrentInitialDate } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekInfo, CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentInitialDate)
      CurrentWeekInfo.WeekGoal.push({
        id: crypto.randomUUID(),
        letter,
        goal
      })

      newWeeksInfo[CurrentWeekIndex] = CurrentWeekInfo
      set({ WeeksInfo: newWeeksInfo })
    },
    deleteGoal: () => {
      console.log('remove')
    },
    goNextWeek: (isNext: boolean = true) => {
      const { CurrentInitialDate } = get()

      const newCurrentInitialDate = new Date(CurrentInitialDate)
      const DaysToAdd = isNext ? 7 : -7
      newCurrentInitialDate.setDate(newCurrentInitialDate.getDate() + DaysToAdd)
      const { FirstDay, LastDay } = getMondayAndSundayString(newCurrentInitialDate)

      set({ CurrentInitialDate: newCurrentInitialDate, CurrentMondayString: FirstDay, CurrentSundayString: LastDay })
    },
    getGoalsLetters: () => {
      const { WeeksInfo, CurrentInitialDate } = get()
      const { CurrentWeekInfo } = getCurrentWeekInfo(WeeksInfo, CurrentInitialDate)
      const GoalsLetters = CurrentWeekInfo.WeekGoal.map((item: { letter: task_letter }) => item.letter)

      set({ GoalsLetters })
    }

  }
}, {
  name: 'WeekInfo'
}
))
