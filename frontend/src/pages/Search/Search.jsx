import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, SearchX } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonCardGrid } from "../../components/ui/Skeleton";
import { searchStudents } from "../../services/studentService";
import { getErrorMessage } from "../../services/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const navigate = useNavigate();

  const [results, setResults] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }
    setResults(null);
    setLoadError(null);
    searchStudents(keyword)
      .then(setResults)
      .catch((error) => setLoadError(getErrorMessage(error)));
  }, [keyword]);

  const isLoading = results === null && !loadError;

  return (
    <div className="section-container animate-fadeIn py-10">
      <PageHeader
        title="Search Results"
        subtitle={keyword ? `Showing results for "${keyword}"` : "Enter a search term to get started."}
        backTo="/dashboard"
        backLabel="Back to Dashboard"
      />

      {loadError ? (
        <div className="rounded-lg border border-danger/30 bg-danger/5 p-6 text-center text-sm text-text-secondary">
          {loadError}
        </div>
      ) : isLoading ? (
        <SkeletonCardGrid count={4} />
      ) : results.length === 0 ? (
        <Card>
          <EmptyState
            icon={SearchX}
            title="No results found."
            description={keyword ? `Nothing matched "${keyword}". Try a different name, roll number, or email.` : undefined}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((student) => (
            <Card key={student.id} interactive>
              <p className="font-medium text-text-primary">{student.name}</p>
              <p className="mt-1 text-sm text-text-secondary">Roll No. {student.rollNumber}</p>
              <p className="mt-0.5 text-sm text-text-secondary">{student.email}</p>
              <p className="mt-0.5 text-sm text-text-muted">{student.courses?.title ?? "No course assigned"}</p>
              <Button
                variant="ghost"
                size="sm"
                icon={Eye}
                className="mt-3"
                onClick={() => navigate(`/student/${student.id}`)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
