import { create } from 'zustand'
import { type task_letter, type WeekInfo, type Day, type Goal } from '../types.d'
import { persist } from 'zustand/middleware'
import { getMondayAndSundayString } from '../services/CurrentWeek'
import { getCurrentWeekInfo } from '../services/CurrentWeekInfo'

interface State {
  WeeksInfo: WeekInfo[]
  GoalsLetters: task_letter[]
  addNewTask: (day: Day, letter: task_letter) => void
  addNewGoal: (goal: Goal, letter: task_letter) => void
  getGoalsLetters: () => void
  CurrentMondayString: string
  CurrentSundayString: string
  deleteGoal: (UUID: string) => void
  goNextWeek: (isNext?: boolean) => void
  fetchWeeksInfo: () => void
  addNewWeek: () => void
}

export const useWeekInfoStore = create<State>()(persist((set, get) => {
  const today = new Date()
  const { FirstDay, LastDay } = getMondayAndSundayString(today)

  return {
    WeeksInfo: [],
    CurrentMondayString: FirstDay,
    CurrentSundayString: LastDay,
    GoalsLetters: [],

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchWeeksInfo: async () => {
      const res = await fetch('http://localhost:5173/WeekInfo.json')
      const json = await res.json()

      set({ WeeksInfo: json })
    },
    addNewWeek: () => {
      const { WeeksInfo, CurrentMondayString } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentMondayString)
      if (CurrentWeekIndex === -1) {
        newWeeksInfo.push({
          id: crypto.randomUUID(),
          Date: CurrentMondayString,
          WeekGoal: [],
          WeekTasks: [
            { day: 'Monday', UserTasksSelected: [] },
            { day: 'Tuesday', UserTasksSelected: [] },
            { day: 'Wednesday', UserTasksSelected: [] },
            { day: 'Thursday', UserTasksSelected: [] },
            { day: 'Friday', UserTasksSelected: [] },
            { day: 'Saturday', UserTasksSelected: [] },
            { day: 'Sunday', UserTasksSelected: [] }
          ]
        })
      }
      console.log('addNewWeek', newWeeksInfo)
      set({ WeeksInfo: newWeeksInfo })
    },
    addNewTask: (day: Day, letter: task_letter) => {
      const { WeeksInfo, CurrentMondayString } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekInfo, CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentMondayString)
      if (CurrentWeekInfo === undefined) return
      const dayIndex = CurrentWeekInfo.WeekTasks.findIndex(item => item.day === day)
      const dayObject = CurrentWeekInfo.WeekTasks[dayIndex]

      dayObject.UserTasksSelected.push(letter)
      CurrentWeekInfo.WeekTasks[dayIndex] = dayObject
      newWeeksInfo[CurrentWeekIndex] = CurrentWeekInfo
      set({ WeeksInfo: newWeeksInfo })
    },
    addNewGoal: (goal: Goal, letter: task_letter) => {
      const { WeeksInfo, CurrentMondayString, getGoalsLetters } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekInfo, CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentMondayString)
      CurrentWeekInfo.WeekGoal.push({
        id: crypto.randomUUID(),
        letter,
        goal
      })

      newWeeksInfo[CurrentWeekIndex] = CurrentWeekInfo
      getGoalsLetters()
      set({ WeeksInfo: newWeeksInfo })
    },
    deleteGoal: (UUID: string) => {
      const { WeeksInfo, CurrentMondayString, getGoalsLetters } = get()
      const newWeeksInfo = structuredClone(WeeksInfo)
      const { CurrentWeekInfo, CurrentWeekIndex } = getCurrentWeekInfo(WeeksInfo, CurrentMondayString)
      const GoalIndex = CurrentWeekInfo.WeekGoal.findIndex(item => item.id === UUID)
      if (GoalIndex > -1) CurrentWeekInfo.WeekGoal.splice(GoalIndex, 1)
      newWeeksInfo[CurrentWeekIndex] = CurrentWeekInfo
      set({ WeeksInfo: newWeeksInfo })
      getGoalsLetters()
    },
    goNextWeek: (isNext: boolean = true) => {
      const { CurrentMondayString, addNewWeek, getGoalsLetters } = get()

      const dateParts = CurrentMondayString.split('-') // Divides la cadena por el separador '-'
      const year = parseInt(dateParts[0]) // Obtienes el año
      const month = parseInt(dateParts[1]) - 1 // Obtienes el mes (restas 1 porque los meses son 0-indexados)
      const day = parseInt(dateParts[2]) // Obtienes el día

      // Creas un objeto Date a partir de los componentes de la fecha
      const newCurrentInitialDate = new Date(year, month, day)
      const DaysToAdd = isNext ? 7 : -7
      newCurrentInitialDate.setDate(newCurrentInitialDate.getDate() + DaysToAdd)

      const { FirstDay, LastDay } = getMondayAndSundayString(newCurrentInitialDate)
      set({ CurrentMondayString: FirstDay, CurrentSundayString: LastDay })
      addNewWeek()
      getGoalsLetters()
    },
    getGoalsLetters: () => {
      const { WeeksInfo, CurrentMondayString } = get()
      const { CurrentWeekInfo } = getCurrentWeekInfo(WeeksInfo, CurrentMondayString)
      const newGoalsLetters = CurrentWeekInfo.WeekGoal.map((item: { letter: task_letter }) => item.letter)
      console.log('getGoalsLetters', newGoalsLetters)
      set({ GoalsLetters: newGoalsLetters })
    }
  }
}, {
  name: 'WeekInfo'
}
))
