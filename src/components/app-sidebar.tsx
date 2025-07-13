'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Library,
  MessagesSquare,
  BrainCircuit,
  User,
  LogOut,
  Settings,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = () => (
  <div className="flex items-center gap-2 p-2">
    <BookOpen className="h-8 w-8 text-primary" />
    <h1 className="text-2xl font-bold text-foreground">NexusNotes</h1>
  </div>
);

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarMenu className="flex-grow">
        <SidebarMenuItem>
          <Link href="/dashboard">
            <SidebarMenuButton isActive={isActive('/dashboard')} tooltip="Dashboard">
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/repository">
            <SidebarMenuButton isActive={isActive('/repository')} tooltip="Repository">
              <Library />
              Repository
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/forum">
            <SidebarMenuButton isActive={isActive('/forum')} tooltip="Forums">
              <MessagesSquare />
              Forums
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/ai-assistant">
            <SidebarMenuButton isActive={isActive('/ai-assistant')} tooltip="AI Assistant">
              <BrainCircuit />
              AI Assistant
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/workspace">
            <SidebarMenuButton isActive={isActive('/workspace')} tooltip="Workspace">
              <User />
              Workspace
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
         <SidebarMenuItem>
          <Link href="#">
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              Settings
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/login">
            <SidebarMenuButton tooltip="Logout">
              <LogOut />
              Logout
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
