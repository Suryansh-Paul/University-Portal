import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import CourseFormModal from "../../components/courses/CourseFormModal";
import { SkeletonDetailPage } from "../../components/ui/Skeleton";
import { useAuth } from "../../hooks/useAuth";
import { getCourseById, updateCourse, deleteCourse } from "../../services/courseService";
import { getErrorMessage } from "../../services/api";
import { formatCurrency, formatDuration } from "../../utils/formatters";
import { showSuccess, showError } from "../../utils/toast";

const InfoField = ({ label, value }) => (
  <div className="card-base p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
    <p className="mt-1.5 text-base text-text-primary">{value}</p>
  </div>
);

const CourseDetails = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCourse = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      setLoadError(getErrorMessage(error, "This course could not be found."));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const handleEditSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await updateCourse(id, payload);
      showSuccess("Course updated");
      setIsEditOpen(false);
      await loadCourse();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteCourse(id);
      showSuccess("Course deleted");
      navigate("/dashboard", { state: { scrollTo: "courses" } });
    } catch (error) {
      showError(getErrorMessage(error));
      setIsDeleting(false);
    }
  };

  if (isLoading) return <SkeletonDetailPage />;

  if (loadError) {
    return (
      <div className="section-container py-16 text-center">
        <p className="text-text-secondary">{loadError}</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="section-container animate-fadeIn py-10">
      <PageHeader
        title={course.title}
        subtitle={course.department}
        backTo="/dashboard"
        backLabel="Back to Courses"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InfoField label="Title" value={course.title} />
        <InfoField label="Department" value={course.department} />
        <InfoField label="Credits" value={course.credits} />
        <InfoField label="Duration" value={formatDuration(course.duration)} />
        <InfoField label="Price" value={formatCurrency(course.price)} />
      </div>

      {course.description && (
        <Card className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Description</p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{course.description}</p>
        </Card>
      )}

      {isAdmin && (
        <div className="mt-8 flex gap-3">
          <Button icon={Pencil} variant="secondary" onClick={() => setIsEditOpen(true)}>
            Edit Course
          </Button>
          <Button icon={Trash2} variant="danger" onClick={() => setIsDeleteOpen(true)}>
            Delete Course
          </Button>
        </div>
      )}

      <CourseFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        course={course}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Course"
        description={`Are you sure you want to delete ${course.title}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CourseDetails;
