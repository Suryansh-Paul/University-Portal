const Card = ({ children, interactive = false, className = "", ...props }) => {
  return (
    <div
      className={`
        rounded-lg border border-border bg-card p-6 shadow-soft
        transition-all duration-250
        ${interactive ? "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft-lg" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
