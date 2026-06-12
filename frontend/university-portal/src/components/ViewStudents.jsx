import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../axios'

function ViewStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const searchKeyword =
    new URLSearchParams(location.search).get('search')

  useEffect(() => {
    setLoading(true)

    const url = searchKeyword
      ? `/students/search?keyword=${encodeURIComponent(searchKeyword)}`
      : '/students'

    api.get(url)
      .then((res) => setStudents(res.data))
      .catch(() => setError('Could not load students. Is the backend running?'))
      .finally(() => setLoading(false))

  }, [searchKeyword])

  // DELETE student by ID → /api/students/{id}
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return

    api.delete(`/students/${id}`)
      .then(() => setStudents(students.filter((s) => s.id !== id)))
      .catch(() => alert('Failed to delete student.'))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">
            Management
          </p>

          <h1 className="section-title">
            {searchKeyword
              ? `Search Results for "${searchKeyword}"`
              : 'All Students'}
          </h1>
        </div>

        <Link to="/students/add" className="btn-primary">
          + Add Student
        </Link>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm py-12">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading students...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <svg className="w-14 h-14 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p className="font-semibold text-slate-500 text-lg">
            {searchKeyword
              ? `No students found for "${searchKeyword}"`
              : 'No Students Available Yet'}
          </p>

          {!searchKeyword && (
            <>
              <p className="text-sm mt-1 mb-6">
                Add a student to get started.
              </p>

              <Link to="/students/add" className="btn-primary">
                + Add First Student
              </Link>
            </>
          )}
        </div>
      )}

      {!loading && students.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left">
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">#</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Email</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Roll No.</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Age</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Course</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{index + 1}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/students/${student.id}`)}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                      </div>

                      <span className="font-semibold text-slate-700 group-hover:text-primary-600 transition-colors">
                        {student.name}
                      </span>
                    </button>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {student.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="badge bg-slate-100 text-slate-600">
                      {student.rollNumber}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {student.age}
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {student.courses?.title || '—'}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/students/update/${student.id}`)}
                        className="text-xs font-semibold text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-xs font-semibold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  )
}

export default ViewStudents