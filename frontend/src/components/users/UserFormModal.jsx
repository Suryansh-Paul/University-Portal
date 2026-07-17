import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { validateUserForm, hasErrors } from "../../utils/validators";

const EMPTY_FORM = { username: "", password: "", role: "" };

const UserFormModal = ({ isOpen, onClose, onSubmit, user, isSubmitting }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(user);

  useEffect(() => {
    if (!isOpen) return;
    setValues(
      user
        ? { username: user.username ?? "", password: "", role: user.role ?? "" }
        : EMPTY_FORM
    );
    setErrors({});
  }, [isOpen, user]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateUserForm(values, { isEdit });
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    const payload = { username: values.username.trim(), role: values.role };
    if (values.password) {
      payload.password = values.password;
    }
    onSubmit(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit User" : "Add User"}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4">
          <Input
            label="Username"
            value={values.username}
            onChange={handleChange("username")}
            error={errors.username}
            disabled={isSubmitting}
          />
          <Input
            label={isEdit ? "Password (leave blank to keep current)" : "Password"}
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password}
            disabled={isSubmitting}
          />
          <Select
            label="Role"
            value={values.role}
            onChange={handleChange("role")}
            error={errors.role}
            disabled={isSubmitting}
          >
            <option value="">Select a role</option>
            <option value="ADMIN">Admin</option>
            <option value="STUDENT">Student</option>
          </Select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEdit ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
