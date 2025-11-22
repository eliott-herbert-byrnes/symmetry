import { Box, ChevronUp, Home, User2, UserPlus, Waypoints } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Fragment } from "react/jsx-runtime";
import { homePath, invitesPath, modelsPath, usersPath } from "@/app/paths";
import { isAdmin, Profile } from "@/lib/auth";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Home",
    url: homePath(),
    icon: Home,
    separator: true,
  },
  {
    title: "Models",
    url: modelsPath(),
    icon: Box,
    isAdmin: false,
  },
  {
    title: "Userbase",
    url: usersPath(),
    icon: User2,
    isAdmin: true,
  },
  {
    title: "Invite",
    url: invitesPath(),
    icon: UserPlus,
    isAdmin: true,
  },
];

export function AppSidebar({ profile }: { profile: Profile | null }) {
  const isAdminUser = profile ? isAdmin(profile) : false;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2 h-full">
          <SidebarGroupLabel>
            <div className="flex flex-row gap-2 items-center">
              <Waypoints className="w-4 h-4" />
              <span className="text-lg font-semibold">Symmetry</span>
            </div>
          </SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.separator ? (
                  <Fragment key={item.title}>
                    <SidebarMenuItem
                      key={item.title}
                      className={cn(item.isAdmin && !isAdminUser && "hidden")}
                    >
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <Separator />
                  </Fragment>
                ) : (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(item.isAdmin && !isAdminUser && "hidden")}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {profile && (
          <SidebarMenu className="border-2 rounded-lg">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {profile.profile?.full_name ?? "User"}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="">
                  <DropdownMenuItem>
                    <ThemeSwitcher />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
