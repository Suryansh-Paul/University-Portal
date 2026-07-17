import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ className = "" }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const keyword = value.trim();
    if (!keyword) return;
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search students..."
        aria-label="Search students"
        className="
          h-9 w-full rounded-md border border-border bg-background-secondary
          pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted
          transition-all duration-250 outline-none
          hover:border-text-secondary
          focus:border-primary focus:shadow-accent-glow
        "
      />
    </form>
  );
};

export default SearchInput;
