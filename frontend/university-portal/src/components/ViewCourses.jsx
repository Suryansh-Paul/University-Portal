import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../axios'

function ViewCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const navigate = useNavigate()

  // GET all courses from Spring Boot API → /api/courses
  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
      .catch(() => setError('Could not load courses. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  // DELETE a course by ID → /api/courses/{id}
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    api.delete(`/courses/${id}`)
      .then(() => setCourses(courses.filter((c) => c.id !== id)))
      .catch(() => alert('Failed to delete course.'))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">Management</p>
          <h1 className="section-title">All Courses</h1>
        </div>
        <Link to="/courses/add" className="btn-primary">+ Add Course</Link>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm py-12">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading courses...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm">{error}</div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <svg className="w-14 h-14 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="font-semibold text-slate-500 text-lg">No Courses Available Yet</p>
          <p className="text-sm mt-1 mb-6">Add a course to get started.</p>
          <Link to="/courses/add" className="btn-primary">+ Add First Course</Link>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left">
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">#</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Title</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Department</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Credits</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Price</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Duration</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.map((course, index) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="font-semibold text-slate-700 hover:text-primary-600 transition-colors text-left"
                    >
                      {course.title}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge bg-primary-50 text-primary-700">{course.department}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{course.credits}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">₹{course.price}</td>
                  <td className="px-6 py-4 text-slate-500">{course.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/courses/update/${course.id}`)}
                        className="text-xs font-semibold text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
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

export default ViewCourses
