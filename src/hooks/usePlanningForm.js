import { useQuery } from '@tanstack/react-query'
import { recipeQuery } from '../queries/mealquery'
import { selectAddPlannedRecipe } from '../store/plannedRecipeSlice'
import { usePlannedRecipeStore } from '../store/usePlannedRecipeStore'
import { getRecipeIngredients } from '../utils/recipeIngredients'

export default function usePlanningForm(recipe, onClose) {
  const addPlannedRecipe = usePlannedRecipeStore(selectAddPlannedRecipe)
  const { data: details, isPending, isError, refetch } = useQuery(recipeQuery(recipe.idMeal))
  const error = isError ? 'Impossible de charger les ingrédients.'
    : !isPending && !details ? 'Recette introuvable.' : ''

  const handleSubmit = (event) => {
    event.preventDefault()
    const date = new FormData(event.currentTarget).get('date')
    if (!date || isPending || isError || !details) return
    const plannedRecipe = {
      id: crypto.randomUUID(), recipeId: details.idMeal,
      name: details.strMeal, ingredients: getRecipeIngredients(details), date,
    }
    addPlannedRecipe(plannedRecipe)
    onClose()
  }
  return { handleSubmit, loading: isPending, error, retry: refetch }
}
