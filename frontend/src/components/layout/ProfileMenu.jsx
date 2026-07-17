import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, ShieldCheck, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { initialsFromUsername } from "../../utils/formatters";
import { showSuccess } from "../../utils/toast";

const ProfileMenu = () => {
  const { username, role, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    showSuccess("You've been logged out.");
    navigate("/", { replace: true });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 transition-colors duration-250 hover:border-border hover:bg-white/[0.03]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {initialsFromUsername(username)}
        </span>
        <span className="hidden text-sm font-medium text-text-primary sm:block">
          {username ?? "Account"}
        </span>
        <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-2 w-56 animate-slideUpFade rounded-lg border border-border bg-card p-1.5 shadow-soft-lg"
        >
          <div className="flex items-center gap-2 px-3 py-2.5 text-sm">
            {isAdmin ? (
              <ShieldCheck className="h-4 w-4 text-primary" />
            ) : (
              <GraduationCap className="h-4 w-4 text-text-secondary" />
            )}
            <span className="text-text-secondary">Role: {role ?? "—"}</span>
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-danger transition-colors duration-250 hover:bg-danger/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
