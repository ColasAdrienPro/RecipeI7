import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { mealsByCategoryQuery, searchQuery } from '../queries/mealquery'

export default function RecipeList({ category, search = '', onPlan }) {
  const query = search.trim() ? searchQuery(search) : mealsByCategoryQuery(category)
  const { data: meals, isPending, isError } = useQuery(query)
  if (isPending) return <p>Chargement des recettes…</p>
  if (isError) return <p>Impossible de charger les recettes.</p>
  if (!meals.length) return <p>Aucune recette trouvée.</p>
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {meals.map((recipe) => (
        <article key={recipe.idMeal} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Link to={`/recette/${recipe.idMeal}`} className="block">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy"
              className="aspect-square w-full object-cover" />
            <h3 className="px-4 pt-4 text-lg font-semibold hover:text-amber-800">{recipe.strMeal}</h3>
          </Link>
          <div className="p-4">
            <button type="button" onClick={() => onPlan(recipe)}
              className="rounded-lg border border-amber-700 px-4 py-2 text-sm text-amber-900 hover:bg-amber-50">
              Planifier
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
