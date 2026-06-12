import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../axios'

function UpdateStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    age: '',
    courseId: '',
  })

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // GET existing student data to pre-fill form → /api/students/{id}
  // Also GET all courses for the dropdown → /api/courses
  useEffect(() => {
    Promise.all([
      api.get(`/students/${id}`),
      api.get('/courses'),
    ])
      .then(([studentRes, coursesRes]) => {
        const student = studentRes.data

        setFormData({
          ...student,
          courseId: student.courses?.id || '',
        })

        setCourses(coursesRes.data)
      })
      .catch(() => setError('Could not load data. Check backend connection.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // PUT updated student → /api/students/{id}
  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      id: parseInt(id),
      name: formData.name,
      email: formData.email,
      rollNumber: formData.rollNumber,
      age: formData.age,
      courses: formData.courseId
        ? { id: parseInt(formData.courseId) }
        : null,
    }

    api.put(`/students/${id}`, payload)
      .then(() => navigate(`/students/${id}`))
      .catch((err) => {
        if (err.response?.data) {

          if (typeof err.response.data === 'object') {
            const messages = Object.values(err.response.data).join(', ')
            setError(messages)
          } else {
            setError(err.response.data)
          }

        } else {
          setError('Failed to update student. Check backend connection.')
        }
      })
      .finally(() => setSaving(false))
  }

  if (loading) return (
    <div className="flex justify-center items-center py-24 text-slate-400 text-sm gap-2">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      Loading...
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      <div className="mb-8">
        <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">Students</p>
        <h1 className="section-title">Update Student</h1>
        <p className="text-sm text-slate-400 mt-1">Edit the fields below and save your changes.</p>
      </div>

      <div className="card">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="form-label">Student Name</label>
            <input
              name="name"
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Roll Number</label>
              <input
                name="rollNumber"
                type="text"
                required
                className="form-input"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Age</label>
              <input
                name="age"
                type="number"
                required
                min="16"
                max="60"
                className="form-input"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Assigned Course</label>
            <select
              name="courseId"
              className="form-input"
              value={formData.courseId}
              onChange={handleChange}
            >
              <option value="">— No course assigned —</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/students/${id}`)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default UpdateStudent