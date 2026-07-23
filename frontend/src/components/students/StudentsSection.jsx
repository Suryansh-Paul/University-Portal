import { useCallback, useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import StudentFormModal from "./StudentFormModal";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";
import { getErrorMessage } from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const StudentsSection = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formModal, setFormModal] = useState({ isOpen: false, student: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleCreate = () => setFormModal({ isOpen: true, student: null });
  const handleEdit = (student) => setFormModal({ isOpen: true, student });
  const closeForm = () => setFormModal({ isOpen: false, student: null });

  const handleFormSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      if (formModal.student) {
        await updateStudent(formModal.student.id, payload);
        showSuccess("Student updated");
      } else {
        await createStudent(payload);
        showSuccess("Student created");
      }
      closeForm();
      await loadStudents();
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
      await deleteStudent(deleteTarget.id);
      showSuccess("Student deleted");
      setDeleteTarget(null);
      await loadStudents();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "rollNumber", header: "Roll Number" },
    { key: "email", header: "Email" },
    {
      key: "course",
      header: "Course",
      render: (row) => row.courses?.title ?? "—",
    },
    { key: "age", header: "Age" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
            onClick={() => navigate(`/student/${row.id}`)}
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
    <section id="students" className="section-container scroll-mt-24 py-16">
  <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

    <div>

      <h1
        className="
          text-4xl
          font-extrabold
          tracking-[-0.02em]
          sm:text-5xl
        "
      >
        <span
          className="
           inline-block
            bg-gradient-to-r
            from-blue-400
            via-indigo-300
            to-cyan-400
            bg-[length:200%_200%]
            bg-clip-text
            text-transparent
            animate-gradientMove
          "
        >
          Students
        </span>
      </h1>

      <p
        className="
          mt-4
          max-w-xl
          text-sm
          font-medium
          leading-7
          text-text-secondary
          sm:text-base
        "
      >
        Manage student records, enrollment and information.
      </p>

      <div
        className="
          mt-5
          h-1
          w-20
          rounded-full
          bg-gradient-to-r
          from-blue-400
          to-cyan-400
        "
      />

    </div>

    {isAdmin && (
      <Button
        icon={Plus}
        onClick={handleCreate}
        className="shrink-0"
      >
        Add Student
      </Button>
    )}

  </div>

      {loadError ? (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-6 text-center">
          <p className="text-sm text-text-secondary">{loadError}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={loadStudents}>
            Retry
          </Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={students}
          isLoading={isLoading}
          getRowKey={(row) => row.id}
          emptyIcon={GraduationCap}
          emptyTitle="No students found."
          emptyDescription={
            isAdmin ? "Start by creating your first student." : "Check back once students have been added."
          }
          emptyAction={
            isAdmin && (
              <Button size="sm" icon={Plus} onClick={handleCreate} className="mt-2">
                Add Student
              </Button>
            )
          }
        />
      )}

      <StudentFormModal
        isOpen={formModal.isOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        student={formModal.student}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        description={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default StudentsSection;
