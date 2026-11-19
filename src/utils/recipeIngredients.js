export function getRecipeIngredients(recipe) {
  const ingredients = []
  for (let index = 1; index <= 20; index++) {
    const name = recipe[`strIngredient${index}`]?.trim()
    const quantity = recipe[`strMeasure${index}`]?.trim() || ''
    if (name) ingredients.push({ name, quantity })
  }
  return ingredients
}
