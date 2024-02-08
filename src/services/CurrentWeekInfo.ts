import { type InitialDate, type WeekInfo } from '../types'

export const getCurrentWeekInfo = (WeeksInfo: WeekInfo[], CurrentDate: InitialDate) => {
  const CurrentWeekIndex = WeeksInfo.findIndex(WeekInfo => WeekInfo.Date === CurrentDate)
  const CurrentWeekInfo = WeeksInfo[CurrentWeekIndex]

  return { CurrentWeekInfo, CurrentWeekIndex }
}
