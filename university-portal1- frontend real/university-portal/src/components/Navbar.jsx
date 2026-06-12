import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Search navigates to students or courses view with a query string.
  // Your backend search endpoints can be wired up later.
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Example: navigate to students with search param
      navigate(`/students?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo + name */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.012 12.083 12.083 0 015.84 10.578L12 14z" />
              </svg>
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-slate-800 text-base">UniPortal</p>
              <p className="text-xs text-slate-400 font-medium">EVANZO</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/courses/add"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              Add Course
            </Link>
            <Link to="/courses"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              View Courses
            </Link>
            <Link to="/students/add"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              Add Student
            </Link>
            <Link to="/students"
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              View Students
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-slate-100 rounded-xl px-3 py-2 gap-2 w-52 lg:w-64">
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students ..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </form>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            <Link to="/courses/add"   onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl">Add Course</Link>
            <Link to="/courses"       onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl">View Courses</Link>
            <Link to="/students/add"  onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl">Add Student</Link>
            <Link to="/students"      onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl">View Students</Link>
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex items-center bg-slate-100 rounded-xl px-3 py-2 gap-2 mt-1 mx-0">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students ..."
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
