import { CardCompact } from "@/components/card-compact";
import { EmptyState } from "@/components/empty-state";
import { InvitationDeleteButton } from "./invite-delete-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvitationPagination } from "./invite-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/server";

export type Invitation = {
  id: string;
  email: string;
  token: string;
  role: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  invited_by: string;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
};

type InvitationListProps = {
  search?: string;
  page?: number;
  invitations: Invitation[];
};

const ITEMS_PER_PAGE = 10;

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: "Pending", variant: "secondary" as const },
    accepted: { label: "Accepted", variant: "default" as const },
    expired: { label: "Expired", variant: "destructive" as const },
    revoked: { label: "Revoked", variant: "outline" as const },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: "Unknown",
    variant: "outline" as const,
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const getRoleBadge = (role: string) => {
  return <Badge variant="outline">{role}</Badge>;
};

const CopyButton = ({ text }: { text: string }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
      <CopyIcon className="h-3 w-3" />
    </Button>
  );
};

const InvitationList = async ({
  invitations,
  search,
  page = 1,
}: InvitationListProps) => {
  const supabase = await createClient();

  let filteredInvitations = invitations;
  if (search) {
    filteredInvitations = invitations.filter((inv) =>
      inv.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = filteredInvitations.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInvitations = filteredInvitations.slice(startIndex, endIndex);

  const invitedByIds = [
    ...new Set(paginatedInvitations.map((inv) => inv.invited_by)),
  ].filter(Boolean);

  const { data: invitedByUsers } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", invitedByIds);

  const invitedByUserMap = Object.fromEntries(
    (invitedByUsers || []).map(
      (user: { id: string; full_name: string; email: string }) => [
        user.id,
        user,
      ]
    )
  );

  const getInviteLink = (token: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${baseUrl}/invite/accept?token=${token}`;
  };

  if (!paginatedInvitations.length) {
    return (
      <EmptyState
        title="No invitations found"
        body={
          search
            ? "Try adjusting your search criteria"
            : "Invite your team members to join the application"
        }
      />
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden px-4 space-y-3">
        {paginatedInvitations.map((inv) => {
          const invitedBy = invitedByUserMap[inv.invited_by];
          const inviteLink = getInviteLink(inv.token);

          return (
            <CardCompact
              key={inv.id}
              title={inv.email}
              description={`Invited by: ${
                invitedBy?.full_name || invitedBy?.email || "Unknown"
              }`}
              content={
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    {getStatusBadge(inv.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Role</span>
                    {getRoleBadge(inv.role)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-xs">
                      {formatDate(inv.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span className="text-xs">
                      {formatDate(inv.expires_at)}
                    </span>
                  </div>
                  {inv.accepted_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Accepted</span>
                      <span className="text-xs">
                        {formatDate(inv.accepted_at)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1 pt-2 border-t">
                    <span className="text-muted-foreground text-xs">
                      Invite Link (MVP - Manual Share)
                    </span>
                    <div className="flex items-center gap-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {inviteLink}
                      </code>
                      <CopyButton text={inviteLink} />
                    </div>
                  </div>
                </div>
              }
              footer={
                <div className="flex justify-end w-full">
                  <InvitationDeleteButton email={inv.email} />
                </div>
              }
              className="w-full"
            />
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Invited By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead>Invite Link</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvitations.map((inv) => {
              const invitedBy = invitedByUserMap[inv.invited_by];
              const inviteLink = getInviteLink(inv.token);

              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.email}</TableCell>
                  <TableCell>{getRoleBadge(inv.role)}</TableCell>
                  <TableCell>{getStatusBadge(inv.status)}</TableCell>
                  <TableCell>
                    {invitedBy?.full_name || invitedBy?.email || "Unknown"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(inv.created_at)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(inv.expires_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 max-w-[200px]">
                      <code className="text-xs bg-muted px-2 py-1 rounded truncate flex-1">
                        {inviteLink}
                      </code>
                      <CopyButton text={inviteLink} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <InvitationDeleteButton email={inv.email} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <InvitationPagination
        currentPage={page}
        totalPages={totalPages}
        total={total}
      />
    </>
  );
};

export { InvitationList };
