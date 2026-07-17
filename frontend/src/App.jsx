import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppShell from "./components/layout/AppShell";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/student/:id" element={<StudentDetails />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
