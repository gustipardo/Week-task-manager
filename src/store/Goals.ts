import { create } from 'zustand'
import { type task_letter, type WeekGoal } from '../types.d'

interface State {
  WeekGoals: WeekGoal[]
  GoalsLetters: task_letter[]
  fetchGoals: () => void
  getAllLetters: () => void
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
      set({ WeekGoals: goals })
    },
    getAllLetters: () => {
      const { WeekGoals } = get()
      const GoalsLetters = WeekGoals.map(item => item.letter)
      set({ GoalsLetters })
    }
  }
}
)
