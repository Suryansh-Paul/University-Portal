import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../axios'

function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [course,  setCourse]  = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // GET course by ID from Spring Boot API → /api/courses/{id}
  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => setError('Course not found or backend is not running.'))
      .finally(() => setLoading(false))
  }, [id])

  // DELETE course → /api/courses/{id}
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    api.delete(`/courses/${id}`)
      .then(() => navigate('/courses'))
      .catch(() => alert('Failed to delete course.'))
  }

  if (loading) return (
    <div className="flex justify-center items-center py-24 text-slate-400 text-sm gap-2">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Loading course...
    </div>
  )

  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <p className="text-red-500 text-sm mb-4">{error}</p>
      <Link to="/courses" className="btn-secondary">← Back to Courses</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-primary-600">Courses</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">{course.title}</span>
      </div>

      <div className="card">
        {/* Top section */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <span className="badge bg-primary-50 text-primary-700 mb-3">{course.department}</span>
            <h1 className="font-display text-3xl font-bold text-slate-800">{course.title}</h1>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold text-primary-600">₹{course.price}</p>
            <p className="text-xs text-slate-400 mt-1">{course.duration}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <DetailItem label="Department"  value={course.department} />
          <DetailItem label="Credits"     value={course.credits} />
          <DetailItem label="Duration"    value={course.duration} />
          <DetailItem label="Price"       value={`₹${course.price}`} />
        </div>

        {/* Description */}
        {course.description && (
          <div className="border-t border-slate-100 pt-5 mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</p>
            <p className="text-slate-600 text-sm leading-relaxed">{course.description}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <button onClick={() => navigate(`/courses/update/${course.id}`)} className="btn-primary">
            ✏️ Update Course
          </button>
          <button onClick={handleDelete} className="btn-danger">
            🗑️ Delete Course
          </button>
          <Link to="/courses" className="btn-secondary">← Back</Link>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl px-4 py-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">{label}</p>
      <p className="text-slate-700 font-semibold text-sm">{value || '—'}</p>
    </div>
  )
}

export default CourseDetails
