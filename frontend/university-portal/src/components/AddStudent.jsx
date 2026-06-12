import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios'

function AddStudent() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    age: '',
    courseId: '',
  })

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // GET all courses to populate the dropdown → /api/courses
  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
      .catch(() => {
        setCourses([])
      })
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // POST new student → /api/students
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = {
      name: formData.name,
      email: formData.email,
      rollNumber: formData.rollNumber,
      age: formData.age,
      courses: formData.courseId
        ? { id: parseInt(formData.courseId) }
        : null,
    }

    api.post('/students', payload)
      .then(() => navigate('/students'))
      .catch((err) => {
        if (err.response?.data) {
          const validationErrors = Object.values(err.response.data).join(', ')
          setError(validationErrors)
        } else {
          setError('Failed to add student. Make sure the backend is running.')
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      <div className="mb-8">
        <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">Students</p>
        <h1 className="section-title">Add New Student</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in the details below to enroll a new student.</p>
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
              placeholder="e.g. Rahul Sharma"
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
              placeholder="e.g. rahul@university.edu"
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
                placeholder="e.g. CS2024001"
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
                placeholder="e.g. 20"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Assign Course</label>
            <select
              name="courseId"
              className="form-input"
              value={formData.courseId}
              onChange={handleChange}
            >
              <option value="">— Select a course (optional) —</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            {courses.length === 0 && (
              <p className="text-xs text-slate-400 mt-1">
                No courses loaded — add courses first or check backend.
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-60"
            >
              {loading ? 'Adding...' : 'Add Student'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/students')}
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

export default AddStudent