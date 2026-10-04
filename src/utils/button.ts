export type ButtonVariant = "primary" | "light" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
"inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm font-display font-bold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-hero text-white hover:bg-hero-dark",
  light: "bg-white text-midnight hover:bg-silver",
  outline: "border border-white/25 text-white hover:border-white hover:bg-white/5",
  ghost: "text-white hover:text-silver"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[11px]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-[13px]"
};

export function buttonClasses(
variant: ButtonVariant = "primary",
size: ButtonSize = "md",
fullWidth = false,
extra = "")
: string {
  return [base, variants[variant], sizes[size], fullWidth ? "w-full" : "", extra].
  filter(Boolean).
  join(" ");
}