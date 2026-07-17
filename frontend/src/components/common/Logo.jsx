const Logo = ({ size = 28, showWordmark = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#3B82F6" />
        <path
          d="M21 12.5C19.9 11.1 18.1 10.2 16.1 10.2C12.6 10.2 9.8 13 9.8 16.5C9.8 20 12.6 22.8 16.1 22.8C18.1 22.8 19.9 21.9 21 20.5"
          stroke="#F9FAFB"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-text-primary">
          CampusCore
        </span>
      )}
    </div>
  );
};

export default Logo;
