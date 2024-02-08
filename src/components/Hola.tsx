import { useEffect } from 'react'
import { useWeekInfoStore } from '../store/WeekInfo'

export const Hola = () => {
  const WeeksInfo = useWeekInfoStore(state => state.hola)
  const fetchHola = useWeekInfoStore(state => state.fetchHola)
  console.log('aa', WeeksInfo)
  useEffect(() => {
    console.log('Effe', WeeksInfo)
    fetchHola()
    console.log('Effe', WeeksInfo)
  }, [WeeksInfo])
  return (
    <>
        <h1>Holaaa</h1>
        <p>{WeeksInfo[1]}</p>
    </>
  )
}
