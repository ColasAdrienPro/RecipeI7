export function getWeekStart(date = new Date()) {
  const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() + 6) % 7)
  return startOfWeek
}

export function getWeeklyIngredients(ingredients, referenceDate = new Date()) {
  const startOfWeek = getWeekStart(referenceDate)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

  return ingredients
    .filter(({ date }) => {
      const consumptionDate = new Date(`${date}T00:00:00`)
      return consumptionDate >= startOfWeek && consumptionDate < endOfWeek
    })
    .sort((first, second) => first.date.localeCompare(second.date))
}
