import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../components/common/Logo";
import AnimatedBackground from "../../components/common/AnimatedBackground";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { validateLoginForm, hasErrors } from "../../utils/validators";
import { getErrorMessage } from "../../services/api";
import { showError, showSuccess, showInfo } from "../../utils/toast";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const sessionMessage = sessionStorage.getItem("campuscore_session_message");
    if (sessionMessage) {
      showInfo(sessionMessage);
      sessionStorage.removeItem("campuscore_session_message");
    }
  }, []);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    try {
      await login(values.username.trim(), values.password);
      showSuccess("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        showError("Invalid username or password");
      } else {
        showError(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
  <div className="relative flex min-h-screen items-center justify-center px-4">
    <AnimatedBackground />

    <div className="w-full max-w-sm animate-fadeInUp">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Logo size={36} showWordmark={false} />
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            CampusCore
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in to manage your university.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-border bg-card p-7 shadow-soft-lg"
        noValidate
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Username"
            autoComplete="username"
            value={values.username}
            onChange={handleChange("username")}
            error={errors.username}
            disabled={isSubmitting}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange("password")}
              error={errors.password}
              disabled={isSubmitting}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-[34px] text-text-muted transition-colors duration-250 hover:text-text-primary"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full"
          isLoading={isSubmitting}
          size="lg"
        >
          Log In
        </Button>
      </form>

      {/* Demo Credentials */}
<div className="mt-5 rounded-xl border border-border bg-card p-5 shadow-soft">
  <h3 className="mb-4 text-center text-sm font-semibold tracking-wide text-text-primary uppercase">
    Demo Credentials
  </h3>

  <div className="grid grid-cols-2 gap-4">
    {/* Admin */}
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <p className="mb-2 text-center text-sm font-semibold text-primary">
        Administrator
      </p>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Username:</span>{" "}
          <span className="font-mono">admin</span>
        </p>

        <p>
          <span className="font-medium">Password:</span>{" "}
          <span className="font-mono">admin123</span>
        </p>
      </div>
    </div>

    {/* Student */}
    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 transition-all duration-300 hover:border-green-500/40 hover:shadow-md">
      <p className="mb-2 text-center text-sm font-semibold text-green-400">
        Student
      </p>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Username:</span>{" "}
          <span className="font-mono">student</span>
        </p>

        <p>
          <span className="font-medium">Password:</span>{" "}
          <span className="font-mono">student1234</span>
        </p>
      </div>
    </div>
  </div>
</div>

      <p className="mt-6 text-center text-xs text-text-muted">
        Built with React · Spring Boot
      </p>
    </div>
  </div>
);
}

export default Login;
