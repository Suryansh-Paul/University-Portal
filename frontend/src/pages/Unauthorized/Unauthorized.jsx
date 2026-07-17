import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Unauthorized = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 border border-danger/30">
        <ShieldAlert className="h-6 w-6 text-danger" />
      </div>
      <h1 className="text-2xl font-semibold text-text-primary">Permission denied</h1>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        You don&rsquo;t have access to this section of CampusCore.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
