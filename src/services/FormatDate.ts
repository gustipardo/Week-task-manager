export function formatearFecha (date: Date) {
  const dia = date.getDate().toString().padStart(2, '0')
  const mes = (date.getMonth() + 1).toString().padStart(2, '0') // Nota: Los meses en JavaScript son base 0
  const anio = date.getFullYear()

  return `${dia}-${mes}-${anio}`
}
