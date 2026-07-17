import Card from "../ui/Card";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import { SkeletonCardGrid } from "../ui/Skeleton";

/**
 * Generic "Recent X" card grid. `items` should already be the trimmed
 * recent slice; `renderItem` returns the card body for one entry.
 */
const RecentList = ({ title, items, isLoading, renderItem, getKey, onViewAll, emptyIcon, emptyText }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </div>

      {isLoading ? (
        <SkeletonCardGrid count={3} />
      ) : items.length === 0 ? (
        <Card>
          <EmptyState icon={emptyIcon} title={emptyText} />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={getKey(item)} interactive>
              {renderItem(item)}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentList;
