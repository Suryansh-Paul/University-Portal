const shimmer = "animate-pulse bg-border/40 rounded";

export const SkeletonCard = () => (
  <div className="card-base p-6">
    <div className={`h-9 w-9 ${shimmer} mb-4`} />
    <div className={`h-3 w-20 ${shimmer} mb-2`} />
    <div className={`h-7 w-14 ${shimmer} mb-3`} />
    <div className={`h-3 w-32 ${shimmer}`} />
  </div>
);

export const SkeletonCardGrid = ({ count = 3 }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className="border-b border-border last:border-0">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-5 py-4">
        <div className={`h-4 w-full max-w-[140px] ${shimmer}`} />
      </td>
    ))}
  </tr>
);

export const SkeletonTable = ({ rows = 5, columns = 5 }) => (
  <table className="w-full">
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonTableRow key={index} columns={columns} />
      ))}
    </tbody>
  </table>
);

export const SkeletonDetailPage = () => (
  <div className="section-container animate-fadeIn py-10">
    <div className={`h-4 w-24 ${shimmer} mb-6`} />
    <div className={`h-9 w-64 ${shimmer} mb-8`} />
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card-base p-5">
          <div className={`h-3 w-20 ${shimmer} mb-3`} />
          <div className={`h-5 w-36 ${shimmer}`} />
        </div>
      ))}
    </div>
  </div>
);
