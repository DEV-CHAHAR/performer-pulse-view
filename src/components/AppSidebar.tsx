
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, BookmarkIcon, BarChart3, Home, UserPlus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Bookmarks", url: "/bookmarks", icon: BookmarkIcon },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Add Employee", url: "/add-employee", icon: UserPlus },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarContent className="bg-white">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HR Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">Performance Management</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium px-6 py-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
