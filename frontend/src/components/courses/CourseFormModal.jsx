import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { validateCourseForm, hasErrors } from "../../utils/validators";

const EMPTY_FORM = {
  title: "",
  department: "",
  credits: "",
  duration: "",
  price: "",
  description: "",
};

const CourseFormModal = ({ isOpen, onClose, onSubmit, course, isSubmitting }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(course);

  useEffect(() => {
    if (!isOpen) return;
    setValues(
      course
        ? {
            title: course.title ?? "",
            department: course.department ?? "",
            credits: course.credits ?? "",
            duration: course.duration ?? "",
            price: course.price ?? "",
            description: course.description ?? "",
          }
        : EMPTY_FORM
    );
    setErrors({});
  }, [isOpen, course]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateCourseForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    onSubmit({
      title: values.title.trim(),
      department: values.department.trim(),
      credits: Number(values.credits),
      duration: Number(values.duration),
      price: Number(values.price),
      description: values.description.trim(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Course" : "Add Course"}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Title"
            className="sm:col-span-2"
            value={values.title}
            onChange={handleChange("title")}
            error={errors.title}
            disabled={isSubmitting}
          />
          <Input
            label="Department"
            value={values.department}
            onChange={handleChange("department")}
            error={errors.department}
            disabled={isSubmitting}
          />
          <Input
            label="Credits"
            type="number"
            value={values.credits}
            onChange={handleChange("credits")}
            error={errors.credits}
            disabled={isSubmitting}
          />
          <Input
            label="Duration (weeks)"
            type="number"
            value={values.duration}
            onChange={handleChange("duration")}
            error={errors.duration}
            disabled={isSubmitting}
          />
          <Input
            label="Price"
            type="number"
            step="0.01"
            value={values.price}
            onChange={handleChange("price")}
            error={errors.price}
            disabled={isSubmitting}
          />
          <Input
            label="Description"
            className="sm:col-span-2"
            value={values.description}
            onChange={handleChange("description")}
            error={errors.description}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEdit ? "Save Changes" : "Create Course"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseFormModal;
