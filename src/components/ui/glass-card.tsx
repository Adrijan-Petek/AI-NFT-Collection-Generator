import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_10px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
