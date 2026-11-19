import { useEffect, useRef } from 'react'
import PlanningForm from './PlanningForm'

export default function PlanningModal({ recipe, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  return (
    <dialog ref={dialogRef} aria-labelledby="planning-title" onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 bg-white p-0 text-slate-800 shadow-xl backdrop:bg-slate-900/50">
      <div className="p-6">
        <h2 id="planning-title" className="text-2xl font-bold">Planifier une recette</h2>
        <p className="mt-2">{recipe.strMeal}</p>
        <PlanningForm recipe={recipe} onClose={onClose} />
      </div>
    </dialog>
  )
}
