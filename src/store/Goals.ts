import { create } from 'zustand'
import { type Goal, type task_letter, type WeekGoal } from '../types.d'
import { useDateStore } from './Dates'
import { formatearFecha } from '../services/FormatDate'

interface State {
  WeekGoals: WeekGoal[]
  GoalsLetters: task_letter[]
  fetchGoals: () => void
  addUserGoal: (goal: Goal, letter: task_letter) => void
  updateGoalsLetters: () => void
  removeGoal: (id: string) => void
}

export const useGoalsStore = create<State>((set, get) => {
  return {
    WeekGoals: [],
    GoalsLetters: [],

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchGoals: async () => {
      const CurrentInitialDate = useDateStore.getState().CurrentInitialDate
      const CurrentInitialDateString = formatearFecha(CurrentInitialDate)
      //   console.log('goals')
      const res = await fetch('http://localhost:5173/WeekInfo.json')
      const json = await res.json()
      const CurrentWeekInfo = json.WeeksInfo.find(((semana: { date: string }) => semana.date === CurrentInitialDateString))
      const CurrentWeekGoal = CurrentWeekInfo.WeekGoal
      const GoalsLetters = CurrentWeekGoal.map((item: { letter: task_letter }) => item.letter)
      console.log('CurrentGoal', CurrentWeekGoal)
      set({ WeekGoals: CurrentWeekGoal, GoalsLetters })
    },
    addUserGoal: (goal: Goal, letter: task_letter) => {
      const { WeekGoals } = get()
      const newWeekGoals = structuredClone(WeekGoals)
      newWeekGoals.push({
        id: crypto.randomUUID(),
        letter,
        goal
      })
      set({ WeekGoals: newWeekGoals })
    },
    updateGoalsLetters: () => {
      const { WeekGoals } = get()
      const GoalsLetters = WeekGoals.map((item: { letter: task_letter }) => item.letter)

      set({ GoalsLetters })
    },
    removeGoal: (id: string) => {
      const { WeekGoals, updateGoalsLetters } = get()
      const newWeekGoals = structuredClone(WeekGoals)
      const GoalIndex = newWeekGoals.findIndex(item => item.id === id)
      if (GoalIndex > -1) newWeekGoals.splice(GoalIndex, 1)
      set({ WeekGoals: newWeekGoals })
      updateGoalsLetters()
    }
  }
}
)
