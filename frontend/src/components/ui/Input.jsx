import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            h-10 w-full rounded-md bg-background-secondary border px-3 text-sm
            text-text-primary placeholder:text-text-muted
            transition-all duration-250 outline-none
            ${error ? "border-danger" : "border-border hover:border-text-secondary focus:border-primary focus:shadow-accent-glow"}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-danger">
            {error}
          </p>
        )}
        {!error && hint && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
