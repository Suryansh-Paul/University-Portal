import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import DashboardHome from "../../components/dashboard/DashboardHome";
import StudentsSection from "../../components/students/StudentsSection";
import CoursesSection from "../../components/courses/CoursesSection";
import UsersSection from "../../components/users/UsersSection";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../context/UIContext";
import { useActiveSection } from "../../hooks/useActiveSection";

const SECTION_IDS = ["dashboard", "students", "courses", "users"];

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const { setActiveSection } = useUI();
  const location = useLocation();

  const visibleSectionIds = useMemo(
    () => (isAdmin ? SECTION_IDS : SECTION_IDS.filter((id) => id !== "users")),
    [isAdmin]
  );
  const activeSection = useActiveSection(visibleSectionIds);

  useEffect(() => {
    setActiveSection(activeSection);
  }, [activeSection, setActiveSection]);

  // Navbar sends { state: { scrollTo } } when navigating here from another page.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const timeout = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [location.state]);

  return (
    <div className="animate-fadeIn">
      <DashboardHome />
      <StudentsSection />
      <CoursesSection />
      {isAdmin && <UsersSection />}
    </div>
  );
};

export default Dashboard;
