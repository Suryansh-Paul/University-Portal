import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import StudentFormModal from "../../components/students/StudentFormModal";
import { SkeletonDetailPage } from "../../components/ui/Skeleton";
import { useAuth } from "../../hooks/useAuth";
import { getStudentById, updateStudent, deleteStudent } from "../../services/studentService";
import { getErrorMessage } from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const InfoField = ({ label, value }) => (
  <div className="card-base p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
    <p className="mt-1.5 text-base text-text-primary">{value}</p>
  </div>
);

const StudentDetails = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadStudent = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getStudentById(id);
      setStudent(data);
    } catch (error) {
      setLoadError(getErrorMessage(error, "This student could not be found."));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const handleEditSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      await updateStudent(id, payload);
      showSuccess("Student updated");
      setIsEditOpen(false);
      await loadStudent();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      showSuccess("Student deleted");
      navigate("/dashboard", { state: { scrollTo: "students" } });
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
        title={student.name}
        subtitle="Student record"
        backTo="/dashboard"
        backLabel="Back to Students"
      />

      <div className="mb-6 flex items-center gap-2">
        <Badge variant={student.user?.role === "ADMIN" ? "admin" : "student"}>
          {student.user?.role ?? "STUDENT"}
        </Badge>
        {isAdmin ? (
          <Badge variant="success">Can Edit</Badge>
        ) : (
          <Badge variant="student">View Only</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InfoField label="Name" value={student.name} />
        <InfoField label="Email" value={student.email} />
        <InfoField label="Roll Number" value={student.rollNumber} />
        <InfoField label="Age" value={student.age} />
        <InfoField label="Course" value={student.courses?.title ?? "Not assigned"} />
        <InfoField label="Username" value={student.user?.username ?? "—"} />
      </div>

      {isAdmin && (
        <div className="mt-8 flex gap-3">
          <Button icon={Pencil} variant="secondary" onClick={() => setIsEditOpen(true)}>
            Edit Student
          </Button>
          <Button icon={Trash2} variant="danger" onClick={() => setIsDeleteOpen(true)}>
            Delete Student
          </Button>
        </div>
      )}

      <Card className="mt-10">
        <p className="text-sm text-text-secondary">
          Return to <button className="text-primary hover:underline" onClick={() => navigate("/dashboard", { state: { scrollTo: "students" } })}>Students</button> to see the full list.
        </p>
      </Card>

      <StudentFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        student={student}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        description={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default StudentDetails;
