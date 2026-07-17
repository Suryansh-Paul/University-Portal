import { useCallback, useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import DataTable from "../common/DataTable";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import CourseFormModal from "./CourseFormModal";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";
import { getErrorMessage } from "../../services/api";
import { formatCurrency, formatDuration } from "../../utils/formatters";
import { showSuccess, showError } from "../../utils/toast";

const CoursesSection = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formModal, setFormModal] = useState({ isOpen: false, course: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleCreate = () => setFormModal({ isOpen: true, course: null });
  const handleEdit = (course) => setFormModal({ isOpen: true, course });
  const closeForm = () => setFormModal({ isOpen: false, course: null });

  const handleFormSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      if (formModal.course) {
        await updateCourse(formModal.course.id, payload);
        showSuccess("Course updated");
      } else {
        await createCourse(payload);
        showSuccess("Course created");
      }
      closeForm();
      await loadCourses();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteCourse(deleteTarget.id);
      showSuccess("Course deleted");
      setDeleteTarget(null);
      await loadCourses();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    { key: "title", header: "Title" },
    { key: "department", header: "Department" },
    { key: "credits", header: "Credits" },
    { key: "duration", header: "Duration", render: (row) => formatDuration(row.duration) },
    { key: "price", header: "Price", render: (row) => formatCurrency(row.price) },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => navigate(`/course/${row.id}`)}
          >
            View
          </Button>
          {isAdmin && (
            <>
              <Button variant="ghost" size="sm" icon={Pencil} onClick={() => handleEdit(row)}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                className="text-danger hover:bg-danger/10 hover:text-danger"
                onClick={() => setDeleteTarget(row)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <section id="courses" className="section-container scroll-mt-24 py-16">
      <SectionHeader
        title="Courses"
        subtitle="Create and manage university courses."
        action={
          isAdmin && (
            <Button icon={Plus} onClick={handleCreate}>
              Add Course
            </Button>
          )
        }
      />

      {loadError ? (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-6 text-center">
          <p className="text-sm text-text-secondary">{loadError}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={loadCourses}>
            Retry
          </Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={courses}
          isLoading={isLoading}
          getRowKey={(row) => row.id}
          emptyIcon={BookOpen}
          emptyTitle="No courses found."
          emptyDescription={
            isAdmin ? "Start by creating your first course." : "Check back once courses have been added."
          }
          emptyAction={
            isAdmin && (
              <Button size="sm" icon={Plus} onClick={handleCreate} className="mt-2">
                Add Course
              </Button>
            )
          }
        />
      )}

      <CourseFormModal
        isOpen={formModal.isOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        course={formModal.course}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        description={`Are you sure you want to delete ${deleteTarget?.title}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default CoursesSection;
