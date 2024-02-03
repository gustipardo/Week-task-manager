import { type InitialDate } from '../types'

export function getMondayAndSundayString (date: InitialDate, IsMondayFirstDayWeek: boolean = true): { FirstDay: string, LastDay: string, FirstDate: InitialDate, LastDate: InitialDate } {
  // Asegúrate de copiar la fecha para no modificar la fecha original
  const currentDate = new Date(date)

  // Obtén el día de la semana (0 para domingo, 1 para lunes, etc.)
  const dayOfWeek = currentDate.getDay()

  // Calcula la diferencia entre el día actual y el lunes (considerando si el lunes es el primer día de la semana)
  const daysUntilMonday = (dayOfWeek + (IsMondayFirstDayWeek ? 6 : 0)) % 7
  const daysUntilSunday = (dayOfWeek + (IsMondayFirstDayWeek ? 0 : 6)) % 7

  // Calcula la fecha del lunes y del domingo
  const monday = new Date(currentDate)
  monday.setDate(currentDate.getDate() - daysUntilMonday)

  const sunday = new Date(currentDate)
  sunday.setDate(currentDate.getDate() + daysUntilSunday)

  // Formatea las fechas como cadenas
  const firstDayString = monday.toISOString().split('T')[0]
  const lastDayString = sunday.toISOString().split('T')[0]

  return {
    FirstDay: firstDayString,
    LastDay: lastDayString,
    FirstDate: monday,
    LastDate: sunday
  }
}
