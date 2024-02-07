import { create } from 'zustand'
import { type WeekInfo } from '../types.d'
import { persist } from 'zustand/middleware'

interface State {
  WeeksInfo: WeekInfo[]

}

export const useWeekInfoStore = create<State>()(persist((set, get) => {
  return {
    WeeksInfo: [],
    addNewWeek: () => {

    },
    addNewTask: () => {

    },
    addNewGoal: () => {

    }

  }
}, {
  name: 'WeekInfo'
}
))
