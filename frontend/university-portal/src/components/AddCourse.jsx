import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../axios'

function AddCourse() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    credits: '',
    price: '',
    duration: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // POST new course to Spring Boot API → /api/courses
    api.post('/courses', formData)
      .then(() => navigate('/courses'))
      .catch(() => setError('Failed to add course. Make sure the backend is running.'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* Page header */}
      <div className="mb-8">
        <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">Courses</p>
        <h1 className="section-title">Add New Course</h1>
        <p className="text-sm text-slate-400 mt-1">Fill in the details below to add a course to the portal.</p>
      </div>

      <div className="card">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="form-label" htmlFor="title">Course Title</label>
            <input id="title" name="title" type="text" required
              className="form-input" placeholder="e.g. Introduction to Computer Science"
              value={formData.title} onChange={handleChange} />
          </div>

          <div>
            <label className="form-label" htmlFor="department">Department</label>
            <input id="department" name="department" type="text" required
              className="form-input" placeholder="e.g. Computer Science"
              value={formData.department} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="credits">Credits</label>
              <input id="credits" name="credits" type="number" required min="1"
                className="form-input" placeholder="e.g. 4"
                value={formData.credits} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label" htmlFor="price">Price (₹)</label>
              <input id="price" name="price" type="number" required min="0"
                className="form-input" placeholder="e.g. 15000"
                value={formData.price} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="duration">Duration</label>
            <input id="duration" name="duration" type="text" required
              className="form-input" placeholder="e.g. 6 months / 1 semester"
              value={formData.duration} onChange={handleChange} />
          </div>

          <div>
            <label className="form-label" htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="4"
              className="form-input resize-none" placeholder="Short course description..."
              value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Adding...' : 'Add Course'}
            </button>
            <button type="button" onClick={() => navigate('/courses')} className="btn-secondary">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddCourse
