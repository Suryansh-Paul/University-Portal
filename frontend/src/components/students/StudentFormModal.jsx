import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { validateStudentForm, hasErrors } from "../../utils/validators";
import { getAllCourses } from "../../services/courseService";
import { showError } from "../../utils/toast";

const EMPTY_FORM = {
  username: "",
  password: "",
  name: "",
  email: "",
  rollNumber: "",
  age: "",
  courseId: "",
};

const StudentFormModal = ({ isOpen, onClose, onSubmit, student, isSubmitting }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  const isEdit = Boolean(student);

  useEffect(() => {
    if (!isOpen) return;

    setValues(
      student
        ? {
            username: student.user?.username ?? "",
            password: "",
            name: student.name ?? "",
            email: student.email ?? "",
            rollNumber: student.rollNumber ?? "",
            age: student.age ?? "",
            courseId: student.courses?.id ?? "",
          }
        : EMPTY_FORM
    );
    setErrors({});

    setIsLoadingCourses(true);
    getAllCourses()
      .then(setCourses)
      .catch(() => showError("Couldn't load courses. Please try again."))
      .finally(() => setIsLoadingCourses(false));
  }, [isOpen, student]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateStudentForm(values, { isEdit });
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    const payload = {
      username: values.username.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      rollNumber: Number(values.rollNumber),
      age: Number(values.age),
      courseId: Number(values.courseId),
    };
    if (values.password) {
      payload.password = values.password;
    }
    onSubmit(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Student" : "Add Student"}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <Input
            label="Student Name"
            className="sm:col-span-2"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
            disabled={isSubmitting}
          />
          <Input
            label="Email"
            type="email"
            className="sm:col-span-2"
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email}
            disabled={isSubmitting}
          />
          <Input
            label="Roll Number"
            type="number"
            value={values.rollNumber}
            onChange={handleChange("rollNumber")}
            error={errors.rollNumber}
            disabled={isSubmitting}
          />
          <Input
            label="Age"
            type="number"
            value={values.age}
            onChange={handleChange("age")}
            error={errors.age}
            disabled={isSubmitting}
          />
          <Select
            label="Course"
            className="sm:col-span-2"
            value={values.courseId}
            onChange={handleChange("courseId")}
            error={errors.courseId}
            disabled={isSubmitting || isLoadingCourses}
          >
            <option value="">{isLoadingCourses ? "Loading courses..." : "Select a course"}</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEdit ? "Save Changes" : "Create Student"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentFormModal;
