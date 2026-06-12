import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../axios'

function UpdateCourse() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    credits: '',
    price: '',
    duration: '',
    description: '',
  })

  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState(null)

  // GET existing course data to pre-fill form → /api/courses/{id}
  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => setError('Could not load course data.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // PUT updated course → /api/courses/{id}
  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    api.put(`/courses/${id}`, formData)
      .then(() => navigate(`/courses/${id}`))
      .catch(() => setError('Failed to update course. Check backend connection.'))
      .finally(() => setSaving(false))
  }

  if (loading) return (
    <div className="flex justify-center items-center py-24 text-slate-400 text-sm gap-2">
      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Loading...
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      <div className="mb-8">
        <p className="text-primary-600 text-xs font-semibold uppercase tracking-widest mb-1">Courses</p>
        <h1 className="section-title">Update Course</h1>
        <p className="text-sm text-slate-400 mt-1">Edit the fields below and save your changes.</p>
      </div>

      <div className="card">
        {error && (
          <div className="mb-5 bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="form-label">Course Title</label>
            <input name="title" type="text" required className="form-input"
              value={formData.title} onChange={handleChange} />
          </div>

          <div>
            <label className="form-label">Department</label>
            <input name="department" type="text" required className="form-input"
              value={formData.department} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Credits</label>
              <input name="credits" type="number" required min="1" className="form-input"
                value={formData.credits} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Price (₹)</label>
              <input name="price" type="number" required min="0" className="form-input"
                value={formData.price} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="form-label">Duration</label>
            <input name="duration" type="text" required className="form-input"
              value={formData.duration} onChange={handleChange} />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea name="description" rows="4" className="form-input resize-none"
              value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate(`/courses/${id}`)} className="btn-secondary">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default UpdateCourse
