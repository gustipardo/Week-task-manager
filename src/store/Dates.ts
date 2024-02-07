import { create } from 'zustand'
import { type InitialDate } from '../types.d'
import { getMondayAndSundayString } from '../services/CurrentWeek'
import { persist } from 'zustand/middleware'

interface State {
  CurrentInitialDate: InitialDate
  CurrentMondayString: string
  CurrentSundayString: string
  goNextWeek: (isNext?: boolean) => void
}

export const useDateStore = create<State>()(persist((set, get) => {
  const today = new Date()
  const { FirstDay, LastDay, FirstDate } = getMondayAndSundayString(today)
  return {
    CurrentInitialDate: FirstDate,
    CurrentMondayString: FirstDay,
    CurrentSundayString: LastDay,
    goNextWeek: (isNext: boolean = true) => {
      const { CurrentInitialDate } = get()
      // console.log('Old ', CurrentInitialDate)
      const newCurrentInitialDate = new Date(CurrentInitialDate)
      const DaysToAdd = isNext ? 7 : -7
      newCurrentInitialDate.setDate(newCurrentInitialDate.getDate() + DaysToAdd)
      const { FirstDay, LastDay } = getMondayAndSundayString(newCurrentInitialDate)
      // console.log('New ', newCurrentInitialDate)

      set({ CurrentInitialDate: newCurrentInitialDate, CurrentMondayString: FirstDay, CurrentSundayString: LastDay })
    }
  }
}, {
  name: 'Dates'
}
))
