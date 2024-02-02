import { create } from 'zustand'
import { type InitialDate } from '../types.d'
import { getMondayAndSundayString } from '../services/CurrentWeek'

interface State {
  CurrentInitialDate: InitialDate
  CurrentMondayString: string
  CurrentSundayString: string
  goNextWeek: () => void
}

export const useDateStore = create<State>((set, get) => {
  const today = new Date()
  const { mondayDate, monday, sunday } = getMondayAndSundayString(today)
  return {
    CurrentInitialDate: mondayDate,
    CurrentMondayString: monday,
    CurrentSundayString: sunday,
    goNextWeek: () => {
      const { CurrentInitialDate } = get()
      console.log('Old ', CurrentInitialDate)
      const newCurrentInitialDate = new Date(CurrentInitialDate)
      newCurrentInitialDate.setDate(newCurrentInitialDate.getDate() + 7)
      const { monday, sunday } = getMondayAndSundayString(newCurrentInitialDate)
      console.log('New ', newCurrentInitialDate)
      set({ CurrentInitialDate: newCurrentInitialDate, CurrentMondayString: monday, CurrentSundayString: sunday })
    }
  }
}
)
