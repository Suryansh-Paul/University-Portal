const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">

      {/* Main Glow */}
      <div
        className="absolute -left-52 -top-52 h-[700px] w-[700px] rounded-full opacity-[0.16] blur-[170px] animate-meshDrift"
        style={{
          background: "#4F7CFF",
        }}
      />

      {/* Secondary Glow */}
      <div
        className="absolute right-[-180px] top-[18%] h-[620px] w-[620px] rounded-full opacity-[0.12] blur-[180px] animate-meshDrift"
        style={{
          background: "#3B82F6",
          animationDelay: "-10s",
        }}
      />

      {/* Bottom Glow */}
      <div
        className="absolute bottom-[-220px] left-[22%] h-[650px] w-[650px] rounded-full opacity-[0.10] blur-[190px] animate-meshDrift"
        style={{
          background: "#2563EB",
          animationDelay: "-18s",
        }}
      />

      {/* Small Accent */}
      <div
        className="absolute bottom-[10%] right-[15%] h-[260px] w-[260px] rounded-full opacity-[0.08] blur-[120px] animate-meshDrift"
        style={{
          background: "#60A5FA",
          animationDelay: "-26s",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;