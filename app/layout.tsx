'use client';

import React from "react";
import Link from "next/link";
import "./globals.css";

const sidebarItems = [
  { label: "Dashboard", icon: "🏠", href: "/" },
  { label: "Tasks", icon: "📋", href: "/tasks" },
  { label: "Team", icon: "👥", href: "/team" },
  { label: "Office (3D)", icon: "🏢", href: "/office" },
  { label: "Brand Deals", icon: "💼", href: "/deals" },
  { label: "Content", icon: "📝", href: "/content" },
  { label: "Settings", icon: "⚙️", href: "/settings" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a14] min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-[240px] h-screen bg-[#111127] border-r border-[#1e1e3a] flex flex-col p-6 text-white fixed left-0 top-0">
          <h2 className="text-2xl font-bold mb-10 text-purple-400">Mairaj Command</h2>
          <nav className="flex flex-col gap-4">
            {sidebarItems.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center gap-3 text-lg font-medium hover:text-[#8b5cf6] cursor-pointer transition-colors">
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen bg-[#0a0a14] ml-[240px] p-10 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
