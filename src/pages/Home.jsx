import { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import RecipeList from '../components/RecipeList'
import PlanningModal from '../components/PlanningModal'
import useToggle from '../hooks/useToggle'

export default function Home() {
  const [filters, setFilters] = useState({ category: 'Beef', search: '' })
  const [search, setSearch] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isOpen, toggle] = useToggle()
  const openPlanning = (recipe) => {
    setSelectedRecipe(recipe)
    toggle()
  }
  const handleSearch = (event) => {
    event.preventDefault()
    setFilters({ ...filters, search: search.trim() })
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Les recettes</h1>
      <form role="search" onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="recipe-search" className="sr-only">Rechercher une recette par nom</label>
        <input id="recipe-search" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher une recette par nom"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3" />
        <button type="submit" className="rounded-xl bg-amber-700 px-5 py-3 font-medium text-white hover:bg-amber-800">
          Rechercher
        </button>
      </form>
      <CategoryFilter selected={filters.search ? '' : filters.category}
        onSelect={(category) => { setFilters({ category, search: '' }); setSearch('') }} />
      <h2 className="text-xl font-semibold">
        {filters.search ? `Résultats pour « ${filters.search} »` : filters.category}
      </h2>
      <RecipeList category={filters.category} search={filters.search} onPlan={openPlanning} />
      {isOpen && <PlanningModal recipe={selectedRecipe} onClose={toggle} />}
    </section>
  )
}
