import { create } from 'zustand'
import { type Goal, type task_letter, type WeekGoal } from '../types.d'

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
    //   console.log('goals')
      const res = await fetch('http://localhost:5173/WeekGoals.json')
      const goals = await res.json()
      console.log(goals)
      const GoalsLetters = goals.map((item: { letter: task_letter }) => item.letter)
      set({ WeekGoals: goals, GoalsLetters })
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
