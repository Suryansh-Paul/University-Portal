import { useNavigate, useLocation } from "react-router-dom";

import SearchInput from "../search/SearchInput";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../context/UIContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "students", label: "Students" },
  { id: "courses", label: "Courses" },
  { id: "users", label: "Users", adminOnly: true },
];

const Navbar = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const { activeSection } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname === "/dashboard") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/dashboard", { state: { scrollTo: sectionId } });
    }
  };

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background-secondary/90 backdrop-blur-sm">
      <div className="section-container flex h-16 items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => handleNavClick("dashboard")}
          className="shrink-0 transition-opacity duration-250 hover:opacity-80"
          aria-label="Go to CampusCore dashboard"
        >
       <div className="flex items-center gap-3">
         <img
           src="/logo.jpg"
           alt="CampusCore Logo"
           className="
             h-10
             w-10
             rounded-full
             object-cover
             border
             border-blue-500/20
             shadow-lg
             select-none
           "
         />

         <span className="text-lg font-bold tracking-[-0.03em] text-text-primary">
           CampusCore
         </span>
       </div>
        </button>

        {isAuthenticated && (
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {visibleItems.map((item) => {
              const isActive = location.pathname === "/dashboard" && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-colors duration-250
                    after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full
                    after:transition-all after:duration-250
                    ${isActive
                      ? "text-text-primary after:bg-primary"
                      : "text-text-secondary after:bg-transparent hover:text-text-primary"}
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {isAuthenticated && (
          <div className="flex flex-1 items-center justify-end gap-4">
            <SearchInput className="hidden max-w-xs flex-1 sm:block" />
            <ProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
