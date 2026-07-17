/**
 * Soft flowing gradient mesh. Movement is extremely slow (40s+ cycles)
 * and low-opacity, per spec: it should only be noticeable after watching
 * the page for several seconds, never compete with foreground content.
 */
const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full opacity-[0.10] blur-[120px] animate-meshDrift"
        style={{ background: "#3B82F6" }}
      />
      <div
        className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full opacity-[0.07] blur-[130px] animate-meshDrift"
        style={{ background: "#60A5FA", animationDelay: "-12s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[140px] animate-meshDrift"
        style={{ background: "#22C55E", animationDelay: "-24s" }}
      />
    </div>
  );
};

export default AnimatedBackground;
