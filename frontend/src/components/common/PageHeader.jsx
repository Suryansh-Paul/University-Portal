import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, subtitle, backTo, backLabel = "Back" }) => {
  return (
    <div className="mb-8">
      {backTo && (
        <Link
          to={backTo}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors duration-250 hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-text-secondary">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
