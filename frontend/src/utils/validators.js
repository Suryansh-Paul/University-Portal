const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the @NotBlank / @Size / @Min constraints on CreateStudentRequest.
export const validateStudentForm = (values, { isEdit = false } = {}) => {
  const errors = {};

  if (!values.username?.trim()) errors.username = "Username cannot be blank";
  else if (values.username.trim().length < 3 || values.username.trim().length > 50)
    errors.username = "Username must be 3–50 characters";

  if (!isEdit || values.password) {
    if (!values.password?.trim()) errors.password = "Password cannot be blank";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  }

  if (!values.name?.trim()) errors.name = "Name cannot be blank";
  else if (values.name.trim().length < 2 || values.name.trim().length > 50)
    errors.name = "Name must be 2–50 characters";

  if (!values.email?.trim()) errors.email = "Email cannot be blank";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Please enter a valid email";

  const rollNumber = Number(values.rollNumber);
  if (!values.rollNumber && values.rollNumber !== 0) errors.rollNumber = "Roll number is required";
  else if (Number.isNaN(rollNumber) || rollNumber < 101) errors.rollNumber = "Roll number cannot be less than 101";

  const age = Number(values.age);
  if (!values.age && values.age !== 0) errors.age = "Age is required";
  else if (Number.isNaN(age) || age < 16) errors.age = "Student must be older than 15";

  if (!values.courseId) errors.courseId = "Please select a course";

  return errors;
};

export const validateCourseForm = (values) => {
  const errors = {};

  if (!values.title?.trim()) errors.title = "Title cannot be blank";
  if (!values.department?.trim()) errors.department = "Department cannot be blank";

  const credits = Number(values.credits);
  if (!values.credits && values.credits !== 0) errors.credits = "Credits are required";
  else if (Number.isNaN(credits) || credits <= 0) errors.credits = "Credits must be a positive number";

  const duration = Number(values.duration);
  if (!values.duration && values.duration !== 0) errors.duration = "Duration is required";
  else if (Number.isNaN(duration) || duration <= 0) errors.duration = "Duration must be a positive number";

  const price = Number(values.price);
  if (!values.price && values.price !== 0) errors.price = "Price is required";
  else if (Number.isNaN(price) || price < 0) errors.price = "Price cannot be negative";

  return errors;
};

export const validateUserForm = (values, { isEdit = false } = {}) => {
  const errors = {};

  if (!values.username?.trim()) errors.username = "Username cannot be blank";
  else if (values.username.trim().length < 3) errors.username = "Username must be at least 3 characters";

  if (!isEdit || values.password) {
    if (!values.password?.trim()) errors.password = "Password cannot be blank";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  }

  if (!values.role) errors.role = "Please select a role";

  return errors;
};

export const validateLoginForm = (values) => {
  const errors = {};
  if (!values.username?.trim()) errors.username = "Username is required";
  if (!values.password?.trim()) errors.password = "Password is required";
  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
