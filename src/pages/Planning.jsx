import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import frLocale from '@fullcalendar/react/locales/fr'
import themePlugin from '@fullcalendar/react/themes/breezy'
import ConfirmModal from '../components/ConfirmModal'
import { selectPlannedRecipes, selectRemovePlannedRecipe, selectUpdatePlannedRecipe } from '../store/plannedRecipeSlice'
import { usePlannedRecipeStore } from '../store/usePlannedRecipeStore'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/breezy/theme.css'
import '@fullcalendar/react/themes/breezy/palettes/amber.css'

const plugins = [themePlugin, dayGridPlugin, interactionPlugin]
const headerToolbar = {
  left: 'prev,next today',
  center: 'title',
  right: 'dayGridMonth,dayGridWeek,dayGridDay',
}

export default function Planning() {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const plannedRecipes = usePlannedRecipeStore(selectPlannedRecipes)
  const removePlannedRecipe = usePlannedRecipeStore(selectRemovePlannedRecipe)
  const updatePlannedRecipe = usePlannedRecipeStore(selectUpdatePlannedRecipe)
  const events = plannedRecipes.map(({ id, name, date }) => ({
    id, title: name, start: date, allDay: true,
  }))
  const handleDelete = () => {
    removePlannedRecipe(selectedRecipe.id)
    setSelectedRecipe(null)
  }
  return (
    <section className="space-y-4 rounded-2xl bg-white p-6">
      <h1 className="text-3xl font-bold">Planning</h1>
      <p className="text-slate-600">Planning pour vos Recettes</p>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <FullCalendar
            plugins={plugins}
            locale={frLocale}
            firstDay={1}
            headerToolbar={headerToolbar}
            height="auto"
            events={events}
            eventStartEditable={true}
            eventDrop={({ event }) => updatePlannedRecipe(event.id, { date: event.startStr })}
            eventClick={({ event }) => setSelectedRecipe({ id: event.id, name: event.title })}
          />
        </div>
      </div>
      {selectedRecipe && (
        <ConfirmModal title="Supprimer la recette ?"
          description={`Voulez-vous supprimer « ${selectedRecipe.name} » du planning et les ingrédients associés de la liste de courses ?`}
          onConfirm={handleDelete} onClose={() => setSelectedRecipe(null)} />
      )}
    </section>
  )
}
