import Card from "../ui/Card";
import Button from "../ui/Button";

const StatCard = ({ icon: Icon, title, count, description, onView, viewLabel = "View" }) => {
  return (
    <Card interactive className="flex flex-col">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-text-secondary">{title}</p>
      <p className="mt-1 text-3xl font-bold text-text-primary">{count}</p>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <div className="mt-5">
        <Button variant="secondary" size="sm" onClick={onView}>
          {viewLabel}
        </Button>
      </div>
    </Card>
  );
};

export default StatCard;
