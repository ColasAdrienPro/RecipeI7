import axios from 'axios'

const api = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1/' })

export async function getCategories() {
  const { data } = await api.get('list.php', { params: { c: 'list' } })
  return data.meals || []
}

export async function getMealsByCategory(category) {
  const { data } = await api.get('filter.php', { params: { c: category } })
  return data.meals || []
}

export async function searchMeals(search) {
  const { data } = await api.get('search.php', { params: { s: search } })
  return data.meals || []
}

export async function getRecipe(id) {
  const { data } = await api.get('lookup.php', { params: { i: id } })
  return data.meals?.[0] || null
}
