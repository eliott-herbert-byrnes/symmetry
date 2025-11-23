"use client";

import { Button } from "@/components/ui/button";
import { ShareIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title || "Symmetry";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "Check out this molecule on Symmetry",
          url: url,
        });
        toast.success("Shared successfully");
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          handleCopyLink(url);
        }
      }
    } else {
      handleCopyLink(url);
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <ShareIcon className="h-4 w-4" />
      )}
      Share
    </Button>
  );
}
