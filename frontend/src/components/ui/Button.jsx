import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-white hover:bg-primary-hover disabled:hover:bg-primary",
  secondary:
    "bg-card text-text-primary border border-border hover:border-text-secondary disabled:hover:border-border",
  danger:
    "bg-danger text-white hover:bg-red-500 disabled:hover:bg-danger",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:hover:bg-transparent",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default Button;
