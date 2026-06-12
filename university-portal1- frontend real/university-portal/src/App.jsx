import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import AddCourse from './components/AddCourse'
import ViewCourses from './components/ViewCourses'
import CourseDetails from './components/CourseDetails'
import UpdateCourse from './components/UpdateCourse'
import AddStudent from './components/AddStudent'
import ViewStudents from './components/ViewStudents'
import StudentDetails from './components/StudentDetails'
import UpdateStudent from './components/UpdateStudent'
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content grows to push footer down */}
      <main className="flex-grow">
        <Routes>
          <Route path="/"                       element={<Home />} />
          <Route path="/courses/add"            element={<AddCourse />} />
          <Route path="/courses"                element={<ViewCourses />} />
          <Route path="/courses/:id"            element={<CourseDetails />} />
          <Route path="/courses/update/:id"     element={<UpdateCourse />} />
          <Route path="/students/add"           element={<AddStudent />} />
          <Route path="/students"               element={<ViewStudents />} />
          <Route path="/students/:id"           element={<StudentDetails />} />
          <Route path="/students/update/:id"    element={<UpdateStudent />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
