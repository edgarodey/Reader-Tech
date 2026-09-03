import React from "react";
import { cn } from "@/lib/utils";

export function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 7.42l-2.07 9.77c-.15.69-.56.86-1.13.53l-3.15-2.32-1.52 1.46c-.17.17-.31.31-.63.31l.22-3.21 5.85-5.28c.25-.23-.06-.35-.39-.13l-7.23 4.55-3.11-.97c-.68-.21-.69-.68.14-1l12.18-4.7c.56-.21 1.06.13.87.99z" />
    </svg>
  );
}

export const SOCIAL_LINKS = [
  {
    name: "X (Twitter)",
    shortName: "X",
    handle: "@edgar0dey",
    url: "https://x.com/edgar0dey",
    icon: XIcon,
    colorClass: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
  },
  {
    name: "Instagram",
    shortName: "Instagram",
    handle: "@odeyedgar",
    url: "https://instagram.com/odeyedgar",
    icon: InstagramIcon,
    colorClass: "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent",
  },
  {
    name: "Telegram",
    shortName: "Telegram",
    handle: "Join Group",
    url: "https://t.me/+3ITyC9dA8Kw0MzVk",
    icon: TelegramIcon,
    colorClass: "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]",
  },
];

interface FollowSocialsProps {
  className?: string;
  variant?: "card" | "compact" | "sidebar" | "banner";
  title?: string;
}

export function FollowSocials({
  className,
  variant = "card",
  title = "Follow Edgar on socials for updates",
}: FollowSocialsProps) {
  if (variant === "sidebar") {
    return (
      <div className={cn("space-y-2 w-full", className)}>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Follow for Updates
        </span>
        <div className="grid grid-cols-3 gap-1.5 w-full">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${item.name} (${item.handle})`}
                className={cn(
                  "flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-[11px] font-semibold transition-all shadow-2xs hover:shadow-xs min-w-0",
                  item.colorClass
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.shortName}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
        <span className="text-xs text-slate-500 font-medium hidden md:inline">
          {title}:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${item.name}: ${item.handle}`}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 text-[11px] font-medium transition-all hover:shadow-2xs",
                  item.colorClass
                )}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{item.shortName}</span>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // "card" / "banner" variant for content sections
  return (
    <div
      className={cn(
        "p-4 sm:p-6 rounded-3xl bg-brand-50/40 border border-brand-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-full overflow-hidden",
        className
      )}
    >
      <div className="space-y-1 text-center sm:text-left min-w-0">
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-600">
          Get feature announcements, study tips, or join our student community group on Telegram.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-center sm:justify-start min-w-0">
        {SOCIAL_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold transition-all shadow-xs hover:shadow-sm min-w-0 flex-1 sm:flex-initial",
                item.colorClass
              )}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.shortName}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden lg:inline">
                {item.handle}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
