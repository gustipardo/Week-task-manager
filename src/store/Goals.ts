import { create } from 'zustand'
import { type WeekGoal } from '../types.d'

interface State {
  WeekGoals: WeekGoal[]
  fetchGoals: () => void
}

export const useGoalsStore = create<State>((set, get) => {
  return {
    WeekGoals: [],

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fetchGoals: async () => {
    //   console.log('goals')
      const res = await fetch('http://localhost:5173/WeekGoals.json')
      const goals = await res.json()
      console.log(goals)
      set({ WeekGoals: goals })
    }
  }
}
)
