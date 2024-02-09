import { type InitialDate } from '../types'

export function getMondayAndSundayString (date: Date, IsMondayFirstDayWeek: boolean = true): { FirstDay: InitialDate, LastDay: InitialDate } {
  // Asegúrate de copiar la fecha para no modificar la fecha original
  const currentDate = new Date(date)

  // Obtén el día de la semana (0 para domingo, 1 para lunes, etc.)
  const dayOfWeek = currentDate.getDay()

  // Calcula la diferencia entre el día actual y el lunes (considerando si el lunes es el primer día de la semana)
  const daysUntilMonday = (dayOfWeek + (IsMondayFirstDayWeek ? 6 : 0)) % 7
  // const daysUntilSunday = (dayOfWeek + (IsMondayFirstDayWeek ? 0 : 6)) % 7

  // Calcula la fecha del lunes
  const monday = new Date(currentDate)
  monday.setDate(currentDate.getDate() - daysUntilMonday)

  // Calcula la fecha del domingo
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  // Formatea las fechas como cadenas
  const firstDayString = formatDate(monday)
  const lastDayString = formatDate(sunday)
  return {
    FirstDay: firstDayString,
    LastDay: lastDayString
  }
}

function formatDate (date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // El mes es 0-indexado
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
