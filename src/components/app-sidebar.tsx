"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, CalendarDays, BarChart3, Settings, HelpCircle, HardHat, Users } from "lucide-react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";

const links = [
  { href: "/dashboard", label: "hi", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDays },
];

const adminLinks = [
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/conflicts", label: "Conflicts", icon: HardHat },
  { href: "/dashboard/manage-users", label: "Users", icon: Users },
  { href: "/dashboard/manage-halls", label: "Halls", icon: Building2 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Building2 className="size-7 text-primary" />
          <span className="font-headline text-xl font-semibold">Hallway</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.label }}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator className="my-4" />

        <p className="px-4 pb-2 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
          Admin
        </p>

        <SidebarMenu>
          {adminLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.label }}
              >
                <Link href="#">
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </>
  );
}
