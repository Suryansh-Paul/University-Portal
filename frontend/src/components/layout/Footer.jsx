

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background-secondary/60">
      <div className="section-container flex flex-col items-center gap-4 py-10 text-center">
       <img
         src="/logo.jpg"
         alt="CampusCore Logo"
         className="
           h-9
           w-9
           rounded-full
           object-cover
           border
           border-blue-500/20
           shadow-md
           select-none
         "
       />
        <p className="max-w-sm text-sm text-text-secondary">
          Modern University Management Platform
        </p>
        <p className="text-xs text-text-muted">
          Built with React &middot; Spring Boot &middot; Spring Security &middot; JWT Authentication
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-text-muted">Designed &amp; Developed by EVANZO</p>
          <p className="text-xs text-text-muted">&copy; 2026 CampusCore</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
