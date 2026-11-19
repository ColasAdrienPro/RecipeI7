import { getCategories, getMealsByCategory, searchMeals, getRecipe } from '../services/mealApi'

export const categoriesQuery = () => ({
    queryKey: ['categories'],
    queryFn:getCategories,
})

export const mealsByCategoryQuery = (category) => ({
    queryKey: ['meals', 'category', category],
    queryFn: () => getMealsByCategory(category),
})

export const searchQuery = (search = '') => ({
    queryKey: ['meals', 'search', search],
    queryFn: () => searchMeals(search),
})

export const recipeQuery = (id) => ({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
})

