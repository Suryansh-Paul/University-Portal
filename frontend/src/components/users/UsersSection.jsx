import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Users as UsersIcon } from "lucide-react";

import DataTable from "../common/DataTable";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import ConfirmDialog from "../ui/ConfirmDialog";
import UserFormModal from "./UserFormModal";
import { useAuth } from "../../hooks/useAuth";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../services/userService";
import { getErrorMessage } from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const UsersSection = () => {
  const { username: currentUsername } = useAuth();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formModal, setFormModal] = useState({ isOpen: false, user: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreate = () => setFormModal({ isOpen: true, user: null });
  const handleEdit = (user) => setFormModal({ isOpen: true, user });
  const closeForm = () => setFormModal({ isOpen: false, user: null });

  const handleFormSubmit = async (payload) => {
    setIsSubmitting(true);
    try {
      if (formModal.user) {
        await updateUser(formModal.user.id, payload);
        showSuccess("User updated");
      } else {
        await createUser(payload);
        showSuccess("User created");
      }
      closeForm();
      await loadUsers();
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
      await deleteUser(deleteTarget.id);
      showSuccess("User deleted");
      setDeleteTarget(null);
      await loadUsers();
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

 const columns = [
  { key: "username", header: "Username" },
  {
    key: "role",
    header: "Role",
    render: (row) => (
      <Badge variant={row.role === "ADMIN" ? "admin" : "student"}>
        {row.role}
      </Badge>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => {
      const isSelf = row.username === currentUsername;
      const isStudent = row.role === "STUDENT";

      return (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            icon={Pencil}
            disabled={isStudent}
            title={isStudent ? "Student accounts are managed from Students section" : undefined}
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            disabled={isSelf || isStudent}
            title={
              isStudent
                ? "Student accounts are managed from Students section"
                : isSelf
                ? "You can't delete your own account"
                : undefined
            }
            className="text-danger hover:bg-danger/10 hover:text-danger"
            onClick={() => setDeleteTarget(row)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

  return (
    <section id="users" className="section-container scroll-mt-24 py-16">
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
             Users
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
           Manage administrator and student accounts across CampusCore.
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

     </div>

      {loadError ? (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-6 text-center">
          <p className="text-sm text-text-secondary">{loadError}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={loadUsers}>
            Retry
          </Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          getRowKey={(row) => row.id}
          emptyIcon={UsersIcon}
          emptyTitle="No users found."
          emptyDescription="Start by creating your first user account."
          emptyAction={
            <Button size="sm" icon={Plus} onClick={handleCreate} className="mt-2">
              Add User
            </Button>
          }
        />
      )}

      <UserFormModal
        isOpen={formModal.isOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        user={formModal.user}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteTarget?.username}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default UsersSection;
