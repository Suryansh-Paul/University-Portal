import { useCallback, useEffect, useState } from "react";
import { GraduationCap, BookOpen, Users as UsersIcon, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import StatCard from "./StatCard";
import RecentList from "./RecentList";
import Button from "../ui/Button";
import { SkeletonCardGrid } from "../ui/Skeleton";
import { useAuth } from "../../hooks/useAuth";
import { getAllStudents } from "../../services/studentService";
import { getAllCourses } from "../../services/courseService";
import { getAllUsers } from "../../services/userService";
import { formatCurrency } from "../../utils/formatters";

const RECENT_COUNT = 3;

const DashboardHome = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState(null);
  const [courses, setCourses] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    getAllStudents().then(setStudents).catch(() => setStudents([]));
    getAllCourses().then(setCourses).catch(() => setCourses([]));
    if (isAdmin) {
      getAllUsers()
        .then((data) => setUserCount(data.length))
        .catch(() => setUserCount(0));
    }
  }, [isAdmin]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const recentStudents = students ? [...students].reverse().slice(0, RECENT_COUNT) : [];
  const recentCourses = courses ? [...courses].reverse().slice(0, RECENT_COUNT) : [];

  return (
    <section id="dashboard" className="section-container scroll-mt-24 py-16">
      <SectionHeader title="Welcome Back 👋" subtitle="Manage your university efficiently with CampusCore." />

      {students === null || courses === null ? (
        <SkeletonCardGrid count={isAdmin ? 3 : 2} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={GraduationCap}
            title="Students"
            count={students.length}
            description="Enrolled across all courses"
            onView={() => scrollTo("students")}
          />
          <StatCard
            icon={BookOpen}
            title="Courses"
            count={courses.length}
            description="Currently offered"
            onView={() => scrollTo("courses")}
          />
          {isAdmin && (
            <StatCard
              icon={UsersIcon}
              title="Users"
              count={userCount ?? "—"}
              description="Administrator and student accounts"
              onView={() => scrollTo("users")}
            />
          )}
        </div>
      )}

      <div className="mt-14 flex flex-col gap-12">
        <RecentList
          title="Recent Students"
          items={recentStudents}
          isLoading={students === null}
          getKey={(item) => item.id}
          onViewAll={() => scrollTo("students")}
          emptyIcon={GraduationCap}
          emptyText="No students found."
          renderItem={(student) => (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-text-primary">{student.name}</p>
              <p className="text-sm text-text-secondary">{student.courses?.title ?? "No course assigned"}</p>
              <p className="text-xs text-text-muted">Roll No. {student.rollNumber}</p>
              <Button
                variant="ghost"
                size="sm"
                icon={Eye}
                className="mt-1 self-start"
                onClick={() => navigate(`/student/${student.id}`)}
              >
                View Details
              </Button>
            </div>
          )}
        />

        <RecentList
          title="Recent Courses"
          items={recentCourses}
          isLoading={courses === null}
          getKey={(item) => item.id}
          onViewAll={() => scrollTo("courses")}
          emptyIcon={BookOpen}
          emptyText="No courses found."
          renderItem={(course) => (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-text-primary">{course.title}</p>
              <p className="text-sm text-text-secondary">{course.department}</p>
              <p className="text-xs text-text-muted">
                {course.credits} credits &middot; {formatCurrency(course.price)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                icon={Eye}
                className="mt-1 self-start"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                View Details
              </Button>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default DashboardHome;
