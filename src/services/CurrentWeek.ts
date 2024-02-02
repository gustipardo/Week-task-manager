import { type InitialDate } from '../types'

export function getMondayAndSundayString (date: InitialDate): { monday: string, sunday: string, mondayDate: InitialDate } {
  const currentDayOfWeek = date.getDay()
  const differenceToMonday = date.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
  const monday = new Date(date.setDate(differenceToMonday))
  const sunday = new Date(date.setDate(differenceToMonday + 6))

  // Restauramos la fecha original para evitar efectos secundarios
  date.setDate(date.getDate() - 7)

  // Formateamos las fechas como dd/mm
  const mondayString = `${monday.getDate().toString().padStart(2, '0')}/${(monday.getMonth() + 1).toString().padStart(2, '0')}`
  const sundayString = `${sunday.getDate().toString().padStart(2, '0')}/${(sunday.getMonth() + 1).toString().padStart(2, '0')}`

  return { monday: mondayString, sunday: sundayString, mondayDate: monday }
}
