import { Link, NavLink, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import ShoppingList from './pages/ShoppingList'
import Planning from './pages/Planning'

export default function App() {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-amber-100 text-amber-900' : 'hover:bg-slate-100'}`

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link to="/" className="text-2xl font-bold text-amber-800">RecipesI7</Link>
          <nav aria-label="Navigation principale" className="flex flex-wrap gap-1">
            <NavLink to="/" end className={linkClass}>Accueil</NavLink>
            <NavLink to="/liste-de-courses" className={linkClass}>Liste de courses</NavLink>
            <NavLink to="/planning" className={linkClass}>Planning</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recette/:id" element={<Recipe />} />
          <Route path="/liste-de-courses" element={<ShoppingList />} />
          <Route path="/planning" element={<Planning />} />
        </Routes>
      </main>
    </div>
  )
}
