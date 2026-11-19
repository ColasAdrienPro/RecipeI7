import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { recipeQuery } from '../queries/mealquery'
import { getRecipeIngredients } from '../utils/recipeIngredients'

export default function Recipe() {
  const { id } = useParams()
  const { data: recipe, isPending, isError } = useQuery(recipeQuery(id))
  if (isPending) return <p>Chargement de la recette…</p>
  if (isError) return <p>Impossible de charger la recette.</p>
  if (!recipe) return <p>Recette introuvable.</p>
  const ingredients = getRecipeIngredients(recipe)
  return (
    <section className="space-y-6">
      <Link to="/" className="text-amber-800 underline">Retour aux recettes</Link>
      <article className="space-y-6 rounded-2xl bg-white p-5 sm:p-8">
        <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
        <p className="text-amber-800">{recipe.strCategory}</p>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-xl" />
          <section>
            <h2 className="mb-4 text-xl font-semibold">Ingrédients</h2>
            <ul className="list-disc space-y-2 pl-5">
              {ingredients.map(({ name, quantity }, index) => <li key={index}>{quantity} {name}</li>)}
            </ul>
          </section>
        </div>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Préparation</h2>
          <p className="whitespace-pre-line leading-relaxed">{recipe.strInstructions}</p>
        </section>
      </article>
    </section>
  )
}
