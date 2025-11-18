import { Box, ChevronUp, Database, Home, Link, User2, Waypoints } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button } from "./ui/button";
import { Fragment } from "react/jsx-runtime";
import { homePath } from "@/app/paths";

  const items = [
    {
      title: "Home",
      url: homePath(),
      icon: Home,
      separator: true,
    },
    {
      title: "Modelbase",
      url: '/',
      icon: Database,
    },
    {
      title: "Userbase",
      url: '/',
      icon: User2,
    },
    {
      title: "Invite",
      url: '/',
      icon: Box,
    },
    
  ];
  
  export async function AppSidebar() {
    
  
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
                {items
                  .map((item) =>
                    item.separator ? (
                      <Fragment key={item.title}>
                        <SidebarMenuItem
                          key={item.title}
                        //   className={cn(item.isAdmin && !isAdmin && "hidden")}
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
                        // className={cn(item.isAdmin && !isAdmin && "hidden")}
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
          <SidebarMenu className="border-2 rounded-lg">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Demo User
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <ThemeSwitcher />
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      className="flex flex-row justify-start w-full h-6"
                    >
                      <Link
                        href="/"
                        className="text-sm font-normal cursor-default"
                      >
                        Support
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      className="flex flex-row justify-start w-full h-6"
                    >
                      <Link
                        href="/"
                        className="text-sm font-normal cursor-default"
                      >
                        Documentation
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      className="flex flex-row justify-start w-full h-6"
                    >
                      <Link
                        href="/"
                        className="text-sm font-normal cursor-default"
                      >
                        Feedback
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>
                    <Button
                    //   onClick={signOutAction}
                      variant="ghost"
                      className="flex flex-row justify-start w-full h-6"
                    >
                      <p className="text-sm font-normal">Logout</p>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }