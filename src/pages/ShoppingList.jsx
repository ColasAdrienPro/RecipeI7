import { useState } from 'react'
import ShoppingListItem from '../components/ShoppingListItem'
import { selectShoppingList } from '../store/shoppingListSlice'
import { usePlannedRecipeStore } from '../store/usePlannedRecipeStore'
import { getWeekStart, getWeeklyIngredients } from '../utils/weeklyIngredients'

const weekDateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric',
})

export default function ShoppingList() {
  const [selectedWeek, setSelectedWeek] = useState(() => getWeekStart())
  const shoppingList = usePlannedRecipeStore(selectShoppingList)
  const ingredients = getWeeklyIngredients(shoppingList, selectedWeek)
  const endOfWeek = new Date(selectedWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)

  const changeWeek = (offset) => {
    setSelectedWeek((currentWeek) => {
      const nextWeek = new Date(currentWeek)
      nextWeek.setDate(nextWeek.getDate() + offset * 7)
      return nextWeek
    })
  }

  return (
    <section className="space-y-4 rounded-2xl bg-white p-6">
      <h1 className="text-3xl font-bold">Liste de courses</h1>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold" aria-live="polite">
          Semaine du {weekDateFormat.format(selectedWeek)} au {weekDateFormat.format(endOfWeek)}
        </h2>
        <nav aria-label="Choisir la semaine des courses" className="flex flex-wrap gap-2">
          <button type="button" onClick={() => changeWeek(-1)}
            className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            ← Semaine précédente
          </button>
          <button type="button" onClick={() => setSelectedWeek(getWeekStart())}
            className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Cette semaine
          </button>
          <button type="button" onClick={() => changeWeek(1)}
            className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Semaine suivante →
          </button>
        </nav>
      </div>
      {ingredients.length ? (
        <ul className="space-y-3">
          {ingredients.map((ingredient) => <ShoppingListItem key={ingredient.id} ingredient={ingredient} />)}
        </ul>
      ) : <p>Aucun ingrédient prévu pour cette semaine.</p>}
    </section>
  )
}
