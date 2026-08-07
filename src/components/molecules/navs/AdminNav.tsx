"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/atoms/buttons/button";
import {
  FileText,
  Briefcase,
  Award,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { clearTokens } from "@/lib/auth/token";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Articles",
      href: "/admin/articles",
      icon: FileText,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      label: "Experiences",
      href: "/admin/experiences",
      icon: Award,
    },
  ];

  const handleSignOut = async () => {
    clearTokens();
    toast.success("Signed out successfully");
    window.location.href = "/admin/login";
  };

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-neutral-400 hover:text-white hover:bg-neutral-800",
                    isActive && "bg-neutral-800 text-white",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
}
