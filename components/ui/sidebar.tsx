"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Library,
  Settings,
  BookOpen,
  HelpCircle,
  Code,
  X,
  ShieldCheck,
  Heart,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Default open on desktop, closed on small mobile
  const [isOpen, setIsOpen] = useState(true);

  // Auto-detect mobile screen on mount to avoid covering mobile screen initially
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  const navLinks = [
    { href: "/library", label: "Library", icon: Library, desc: "Your saved course PDFs" },
    { href: "/settings", label: "Settings", icon: Settings, desc: "Speech voices & reading style" },
    { href: "/about", label: "About", icon: BookOpen, desc: "Mission & architecture" },
    { href: "/help", label: "Help & FAQ", icon: HelpCircle, desc: "Guides and troubleshooting" },
    { href: "/open-source", label: "Open Source", icon: Code, desc: "PolyForm NC repository" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-xs flex items-center justify-center bg-white border border-slate-200">
              <Image
                src="/assets/images/Reader-Logo-nobg.png"
                alt="Reader Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                Reader
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Local-first study reader
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-2xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-brand-50 text-brand-900 font-semibold border border-brand-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate text-xs font-semibold">{link.label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{link.desc}</p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "w-3.5 h-3.5 shrink-0 transition-transform",
                    isActive ? "text-brand-600 translate-x-0.5" : "text-slate-300 group-hover:text-slate-500"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="text-[11px] leading-tight">100% In-Browser Privacy</span>
          </div>

          <div className="text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> by Edgar Odey
          </div>
        </div>
      </aside>
    </>
  );
}
