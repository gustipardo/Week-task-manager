export function formatearFecha (date: Date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Nota: Los meses en JavaScript son base 0
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}
