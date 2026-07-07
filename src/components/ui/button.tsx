import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#4fc9da,#6c8bff)] text-[#02111f] shadow-[0_8px_30px_rgba(79,201,218,0.35)] hover:brightness-105",
  secondary:
    "border border-slate-100/30 bg-slate-100/10 text-slate-100 hover:bg-slate-100/20",
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
        "rounded-xl px-4 py-2 font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
