import { useQuery } from '@tanstack/react-query'
import { categoriesQuery } from '../queries/mealquery'

export default function CategoryFilter({ selected, onSelect }) {
  const { data: categories, isPending, isError } = useQuery(categoriesQuery())
  if (isPending) return <p>Chargement des catégories…</p>
  if (isError) return <p>Impossible de charger les catégories.</p>
  if (!categories.length) return <p>Aucune catégorie disponible.</p>
  return (
    <div aria-label="Catégories de recettes" className="flex flex-wrap gap-2 rounded-2xl bg-white p-4">
      {categories.map(({ strCategory }) => (
        <button key={strCategory} type="button" aria-pressed={selected === strCategory}
          onClick={() => onSelect(strCategory)}
          className={`rounded-full border px-3 py-2 text-sm ${selected === strCategory
            ? 'border-amber-700 bg-amber-50 text-amber-900' : 'border-slate-200 hover:bg-slate-100'}`}>
          {strCategory}
        </button>
      ))}
    </div>
  )
}
