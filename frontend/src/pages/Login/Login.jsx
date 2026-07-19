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
 <div className="relative flex min-h-screen justify-center overflow-y-auto px-4 py-12 lg:py-16">
    <AnimatedBackground />

   <div className="w-full max-w-7xl animate-fadeInUp space-y-10">
    <div className="mb-8 flex flex-col items-center gap-3 text-center overflow-visible">

  <div className="mb-5 flex justify-center">

     <img
       src="/logo.jpg"
       alt="CampusCore Logo"
       className="
       h-28
       w-28
       rounded-full
       object-cover
       bg-white
       p-1
       border-[3px]
       border-blue-400/50
       shadow-[0_0_35px_rgba(79,124,255,0.35)]
       hover:scale-110
       hover:rotate-2
       transition-all
       duration-500
       animate-logoFloat
       select-none
       "
     />
   </div>
<h1
      className="
     text-5xl
     md:text-6xl
     xl:text-7xl
      font-extrabold
      tracking-tight
      bg-gradient-to-r
      from-blue-400
      via-indigo-300
      to-cyan-400
      bg-[length:200%_200%]
      bg-clip-text
      inline-block
      text-transparent
      animate-gradientMove
      select-none
      "
       >
         CampusCore
       </h1>

       <p
       className="
       mt-4
       max-w-md
       mx-auto
       text-base
       leading-8
       font-medium
       text-zinc-400
       "
       >
         A modern university management platform built for
         students and administrators.
       </p>

     </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-10">

  {/* ADMIN */}

  <div className="h-full rounded-2xl border border-blue-500/20 bg-card/80 backdrop-blur-md p-6 flex flex-col justify-center">

    <h3 className="text-blue-400 font-bold text-xl mb-5">
      Administrator Demo Credentials
    </h3>

    <div className="space-y-3">

      <div>
        <p className="text-xs uppercase text-text-muted">
          Username
        </p>

        <p className="font-mono text-lg">
          admin
        </p>
      </div>

      <div>
        <p className="text-xs uppercase text-text-muted">
          Password
        </p>

        <p className="font-mono text-lg">
          admin123
        </p>
      </div>

    </div>

  </div>


  {/* LOGIN */}

  <form
    onSubmit={handleSubmit}
    className="h-full rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 flex flex-col justify-center shadow-soft-lg"
    noValidate
  >

    <div className="space-y-5">

      <Input
        label="Username"
        autoComplete="username"
        value={values.username}
        onChange={handleChange("username")}
        error={errors.username}
      />

      <div className="relative">

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password}
          className="pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[34px]"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>

      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Log In
      </Button>

    </div>

  </form>


  {/* STUDENT */}

  <div className="h-full rounded-2xl border border-green-500/20 bg-card/80 backdrop-blur-md p-6 flex flex-col justify-center">

    <h3 className="text-green-400 font-bold text-xl mb-5">
      Student Demo Credentials
    </h3>

    <div className="space-y-3">

      <div>

        <p className="text-xs uppercase text-text-muted">
          Username
        </p>

        <p className="font-mono text-lg">
          student
        </p>

      </div>

      <div>

        <p className="text-xs uppercase text-text-muted">
          Password
        </p>

        <p className="font-mono text-lg">
          student1234
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