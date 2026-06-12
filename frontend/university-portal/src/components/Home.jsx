import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../axios'

function Home() {
  const [courses, setCourses]   = useState([])
  const [students, setStudents] = useState([])
  const [loadingCourses,  setLoadingCourses]  = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [errorCourses,  setErrorCourses]  = useState(null)
  const [errorStudents, setErrorStudents] = useState(null)

  // GET all courses from Spring Boot API
  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
      .catch(() => setErrorCourses('Could not load courses. Is the backend running?'))
      .finally(() => setLoadingCourses(false))
  }, [])

  // GET all students from Spring Boot API
  useEffect(() => {
    api.get('/students')
      .then((res) => setStudents(res.data))
      .catch(() => setErrorStudents('Could not load students. Is the backend running?'))
      .finally(() => setLoadingStudents(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl px-8 py-12 mb-12 text-white shadow-lg">
        <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-2">Welcome to</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">University Portal</h1>
        <p className="text-primary-200 text-base max-w-xl">
          Manage courses and students from one place. Add a course or student to get started.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/courses/add"  className="bg-white text-primary-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-colors">+ Add Course</Link>
          <Link to="/students/add" className="bg-primary-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-primary-400 transition-colors">+ Add Student</Link>
        </div>
      </div>

      {/* ── COURSES SECTION ── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Courses</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary-600 hover:text-primary-700">View all →</Link>
        </div>

        {loadingCourses && (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-8">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Loading courses...
          </div>
        )}

        {errorCourses && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm">
            {errorCourses}
          </div>
        )}

        {!loadingCourses && !errorCourses && courses.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-semibold text-slate-500">No Courses Available Yet</p>
            <p className="text-sm mt-1">Add your first course to see it here.</p>
          </div>
        )}

        {!loadingCourses && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id} className="card group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="badge bg-primary-50 text-primary-700">{course.department || 'Department'}</span>
                  <span className="text-xs text-slate-400 font-medium">{course.credits} credits</span>
                </div>
                <h3 className="font-semibold text-slate-800 text-base mb-1 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description || 'No description provided.'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-bold text-sm">₹{course.price}</span>
                  <span className="text-xs text-slate-400">{course.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── STUDENTS SECTION ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Students</h2>
          <Link to="/students" className="text-sm font-semibold text-primary-600 hover:text-primary-700">View all →</Link>
        </div>

        {loadingStudents && (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-8">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Loading students...
          </div>
        )}

        {errorStudents && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-sm">
            {errorStudents}
          </div>
        )}

        {!loadingStudents && !errorStudents && students.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-semibold text-slate-500">No Students Available Yet</p>
            <p className="text-sm mt-1">Add your first student to see them here.</p>
          </div>
        )}

        {!loadingStudents && students.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((student) => (
              <Link to={`/students/${student.id}`} key={student.id} className="card group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar circle with initials */}
                  <div className="w-11 h-11 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-primary-600 transition-colors">{student.name}</h3>
                    <p className="text-xs text-slate-400">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="badge bg-slate-100 text-slate-600">Roll: {student.rollNumber}</span>
                  <span>Age: {student.age}</span>
                </div>
                {student.courseName && (
                  <p className="text-xs text-primary-600 font-medium mt-3">📚 {student.courseName}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
