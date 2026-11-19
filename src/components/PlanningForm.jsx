import usePlanningForm from '../hooks/usePlanningForm'

export default function PlanningForm({ recipe, onClose }) {
  const { handleSubmit, loading, error, retry } = usePlanningForm(recipe, onClose)
  return (
    <form onSubmit={handleSubmit} aria-busy={loading} className="mt-6 space-y-4">
      <div>
        <label htmlFor="planning-date" className="block">Date de consommation</label>
        <input id="planning-date" type="date" name="date" required disabled={loading}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      {loading && <p>Chargement des ingrédients…</p>}
      {error && <div role="alert" className="text-red-700">
        <p>{error}</p>
        <button type="button" onClick={() => retry()} className="underline">Réessayer</button>
      </div>}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2">Fermer</button>
        <button type="submit" disabled={loading || Boolean(error)}
          className="rounded-lg bg-amber-700 px-4 py-2 text-white disabled:opacity-50">
          {loading ? 'Chargement…' : 'Valider'}
        </button>
      </div>
    </form>
  )
}
