import { Title } from '@tremor/react'
import { useWeekInfoStore } from '../store/WeekInfo'

export const WeekTitle = () => {
  const monday = useWeekInfoStore(state => state.CurrentMondayString)
  const sunday = useWeekInfoStore(state => state.CurrentSundayString)
  return (
    <Title>Week {monday} - {sunday}</Title>
  )
}
