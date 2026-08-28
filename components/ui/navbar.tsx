"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Plus } from "lucide-react";
import { useSidebar } from "./sidebar";
import { Button } from "./button";

export function Navbar() {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Sidebar Hamburger Toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            title={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-label="Toggle navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-xs flex items-center justify-center bg-white border border-slate-200 group-hover:scale-105 transition-transform">
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
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Reader
              </span>
              <span className="text-[11px] text-slate-500 -mt-1 hidden sm:inline font-medium">
                Local-first study reader
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Clean & uncluttered — Quick Upload Action */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="secondary" size="sm" className="h-9 px-3 text-xs font-semibold text-brand-800">
              <Plus className="w-4 h-4 mr-1 text-brand-600" />
              <span className="hidden sm:inline">Upload PDF</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
