import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#f59e0b,#ef4444)] text-white hover:brightness-110",
  secondary:
    "border border-white/30 bg-white/10 text-white hover:bg-white/20",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
