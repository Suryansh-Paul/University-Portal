import { SkeletonTable } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";

/**
 * columns: [{ key, header, render?: (row) => node, className? }]
 * data: array of row objects
 * getRowKey: (row) => string | number
 */
const DataTable = ({
  columns,
  data,
  isLoading,
  getRowKey,
  emptyIcon,
  emptyTitle = "Nothing here yet.",
  emptyDescription,
  emptyAction,
}) => {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-border">
        <SkeletonTable rows={5} columns={columns.length} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="sticky top-0 bg-background-secondary">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-text-muted ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={getRowKey(row)}
              className="border-t border-border transition-colors duration-250 hover:bg-white/[0.02]"
            >
              {columns.map((column) => (
                <td key={column.key} className={`px-5 py-4 align-middle text-text-primary ${column.className ?? ""}`}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
