import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../axios'

function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // GET student by ID from Spring Boot API → /api/students/{id}
  useEffect(() => {
    api.get(`/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch(() => setError('Student not found or backend is not running.'))
      .finally(() => setLoading(false))
  }, [id])

  // DELETE student → /api/students/{id}
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this student?')) return
    api.delete(`/students/${id}`)
      .then(() => navigate('/students'))
      .catch(() => alert('Failed to delete student.'))
  }

  if (loading) return (
    <div className="flex justify-center items-center py-24 text-slate-400 text-sm gap-2">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Loading student...
    </div>
  )

  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <p className="text-red-500 text-sm mb-4">{error}</p>
      <Link to="/students" className="btn-secondary">← Back to Students</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/students" className="hover:text-primary-600">Students</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">{student.name}</span>
      </div>

      <div className="card">
        {/* Avatar + name header */}
        <div className="flex items-center gap-5 mb-7">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-2xl shrink-0">
            {student.name ? student.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-800">{student.name}</h1>
            <p className="text-slate-400 text-sm mt-0.5">{student.email}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <DetailItem label="Roll Number" value={student.rollNumber} />
          <DetailItem label="Age"         value={student.age} />
          <DetailItem label="Email"       value={student.email} />
        {student.courses && (
  <>
    <DetailItem
      label="Assigned Course"
      value={student.courses.title}
    />
    <DetailItem
      label="Course ID"
      value={student.courses.id}
    />
  </>
)}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2 border-t border-slate-100 mt-2">
          <button onClick={() => navigate(`/students/update/${student.id}`)} className="btn-primary mt-4">
            ✏️ Update Student
          </button>
          <button onClick={handleDelete} className="btn-danger mt-4">
            🗑️ Delete Student
          </button>
          <Link to="/students" className="btn-secondary mt-4">← Back</Link>
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

export default StudentDetails
