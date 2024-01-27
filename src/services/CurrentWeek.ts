export function getMondayAndSundayString (): { monday: string, sunday: string } {
  const today = new Date()
  const currentDayOfWeek = today.getDay()
  const differenceToMonday = today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
  const monday = new Date(today.setDate(differenceToMonday))
  const sunday = new Date(today.setDate(differenceToMonday + 6))

  // Restauramos la fecha original para evitar efectos secundarios
  today.setDate(today.getDate() - 7)

  // Formateamos las fechas como dd/mm
  const mondayString = `${monday.getDate().toString().padStart(2, '0')}/${(monday.getMonth() + 1).toString().padStart(2, '0')}`
  const sundayString = `${sunday.getDate().toString().padStart(2, '0')}/${(sunday.getMonth() + 1).toString().padStart(2, '0')}`

  return { monday: mondayString, sunday: sundayString }
}
