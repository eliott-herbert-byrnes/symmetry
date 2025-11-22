import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { ShareButton } from "@/features/share/share-button";
import { getProfile } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { Waypoints } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Symmetry",
  description:
    "Symmetry is a platform for viewing 3D rendered molecules and crystal structures.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const profile = await getProfile();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar profile={profile} />
            <SidebarInset className="p-2">
              <div className="flex flex-col h-full rounded-lg p-4">
                <div className="flex flex-row items-center gap-2 justify-between mb-2">
                  <div className="flex flex-row items-center gap-2 h-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-4" />
                    <h1 className="font-semibold ml-1.5 flex flex-row items-center gap-2"> <Waypoints className="w-4 h-4" /> Symmetry</h1>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <ShareButton />
                    <AuthButtons />
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex-1 overflow-hidden mt-2">{children}</div>
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
