import { useEffect } from 'react'
import { useWeekInfoStore } from '../store/WeekInfo'

export const Hola = () => {
  const WeeksInfo2 = useWeekInfoStore(state => state.hola)
  const fetchHola = useWeekInfoStore(state => state.fetchHola)

  const WeeksInfo = useWeekInfoStore(state => state.WeeksInfo)
  const fetchWeeksInfo = useWeekInfoStore(state => state.fetchWeeksInfo)

  console.log('aa', WeeksInfo)
  useEffect(() => {
    console.log('Effe', WeeksInfo)
    fetchWeeksInfo()
    console.log('Effe', WeeksInfo)
  }, [])

  // Convertir el objeto WeeksInfo a una cadena JSON
  const weeksInfoString = JSON.stringify(WeeksInfo)

  return (
    <>
      <h1>Holaaa</h1>
      {/* Mostrar la cadena JSON en un párrafo */}
      <p>{weeksInfoString}</p>
    </>
  )
}
