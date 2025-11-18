import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon, Share2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset className="p-2">
              <div className="flex flex-col h-full rounded-lg p-4">
                <div className="flex flex-row items-center gap-2 justify-between mb-2">
                  <div className="flex flex-row items-center gap-2 h-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-4" />
                    <h1 className="font-semibold ml-1.5">Symmetry</h1>
                  </div>
                  {/* buttons */}
                  <Button variant="outline">
                    <LogInIcon />
                    Sign In
                  </Button>
                </div>
                <Separator className="my-2" />
                <div className="flex-1 overflow-hidden mt-2">{children}</div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
