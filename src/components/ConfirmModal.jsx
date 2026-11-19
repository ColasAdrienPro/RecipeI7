import { useEffect, useRef } from 'react'

export default function ConfirmModal({ title, description, onConfirm, onClose }) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    cancelRef.current.focus()
    return () => dialog.close()
  }, [])

  return (
    <dialog ref={dialogRef} aria-labelledby="confirm-title" aria-describedby="confirm-description"
      onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 bg-white p-0 text-slate-800 shadow-xl backdrop:bg-slate-900/50">
      <div className="space-y-4 p-6">
        <h2 id="confirm-title" className="text-2xl font-bold">{title}</h2>
        <p id="confirm-description" className="break-words text-slate-600">{description}</p>
        <div className="flex justify-end gap-3 pt-2">
          <button ref={cancelRef} type="button" onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">
            Annuler
          </button>
          <button type="button" onClick={onConfirm}
            className="rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800">
            Supprimer
          </button>
        </div>
      </div>
    </dialog>
  )
}
