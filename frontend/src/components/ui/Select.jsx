import { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(
  ({ label, error, children, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={Boolean(error)}
            className={`
              h-10 w-full appearance-none rounded-md bg-background-secondary border px-3 pr-9 text-sm
              text-text-primary transition-all duration-250 outline-none
              ${error ? "border-danger" : "border-border hover:border-text-secondary focus:border-primary focus:shadow-accent-glow"}
              ${className}
            `}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
