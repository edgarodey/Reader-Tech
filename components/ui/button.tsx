import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const variants = {
      primary:
        "bg-brand-600 hover:bg-brand-500 text-white border border-brand-700 shadow-sm active:translate-y-px",
      secondary:
        "bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 active:translate-y-px",
      outline:
        "border border-slate-300 hover:bg-slate-50 text-slate-700 active:translate-y-px",
      ghost:
        "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
      danger:
        "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 active:translate-y-px",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5 font-medium",
      icon: "h-10 w-10 p-0 rounded-xl justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
