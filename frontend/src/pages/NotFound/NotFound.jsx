import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-background-secondary border border-border">
        <Compass className="h-6 w-6 text-text-muted" />
      </div>
      <h1 className="text-2xl font-semibold text-text-primary">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
