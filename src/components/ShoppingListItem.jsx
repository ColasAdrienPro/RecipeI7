import { selectRemoveShoppingList, selectUpdateShoppingList } from '../store/shoppingListSlice'
import { usePlannedRecipeStore } from '../store/usePlannedRecipeStore'

export default function ShoppingListItem({ ingredient }) {
  const updateIngredient = usePlannedRecipeStore(selectUpdateShoppingList)
  const removeIngredient = usePlannedRecipeStore(selectRemoveShoppingList)
  const { id, name, recipeName, quantity, date } = ingredient
  return (
    <li className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-[minmax(0,1fr)_12rem_11rem_auto] md:items-end">
      <div className="min-w-0 md:self-center">
        <h2 className="break-words font-semibold">{name}</h2>
        <p className="break-words text-sm text-slate-600">Recette : {recipeName}</p>
      </div>
      <div>
        <label htmlFor={`quantity-${id}`} className="block text-sm">Quantité et unité</label>
        <input id={`quantity-${id}`} type="text" value={quantity} placeholder="Ex. : 200 g"
          onChange={(event) => updateIngredient(id, { quantity: event.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label htmlFor={`date-${id}`} className="block text-sm">Date de consommation</label>
        <input id={`date-${id}`} type="date" value={date} required
          onChange={(event) => { if (event.target.value) updateIngredient(id, { date: event.target.value }) }}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <button type="button" onClick={() => removeIngredient(id)}
        aria-label={`Supprimer ${name} de ${recipeName}`}
        className="rounded-lg border border-red-200 px-3 py-2 text-red-700 hover:bg-red-50">
        Supprimer
      </button>
    </li>
  )
}
