import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditRoleModal } from "./edit-role-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronDown } from "lucide-react";
import { TeamMember } from "../lib/types";

type TeamMemberTableProps = {
  members: TeamMember[];
  onEditRole: (id: string, newRole: "Owner" | "Moderator") => void;
  onRemoveMember: (id: string) => void;
};

export function TeamMemberTable({
  members,
  onEditRole,
  onRemoveMember,
}: Readonly<TeamMemberTableProps>) {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(
    new Set(["Owner", "Moderator"])
  );
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const toggleRole = (role: string) => {
    const newSelectedRoles = new Set(selectedRoles);
    if (newSelectedRoles.has(role)) {
      newSelectedRoles.delete(role);
    } else {
      newSelectedRoles.add(role);
    }
    setSelectedRoles(newSelectedRoles);
  };

  const filteredMembers = members.filter((member) =>
    selectedRoles.has(member.role)
  );

  const handleRemove = (member: TeamMember) => {
    setMemberToRemove(member);
  };

  const confirmRemove = () => {
    if (memberToRemove) {
      onRemoveMember(memberToRemove.id);
      setMemberToRemove(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Members</TableHead>
            <TableHead>
              <div className="flex items-center space-x-2">
                <span>Role</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuCheckboxItem
                      checked={selectedRoles.has("Owner")}
                      onCheckedChange={() => toggleRole("Owner")}
                    >
                      Owner
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedRoles.has("Moderator")}
                      onCheckedChange={() => toggleRole("Moderator")}
                    >
                      Moderator
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingMember(member)}
                >
                  Edit
                </Button>
                <button
                  className="border-transparent text-red-500 hover:text-red-600 bg-transparent hover:bg-transparent"
                  onClick={() => handleRemove(member)}
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingMember && (
        <EditRoleModal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          member={editingMember}
          onEditRole={(newRole) => {
            onEditRole(editingMember.id, newRole);
            setEditingMember(null);
          }}
          //   onRemoveMember={onRemoveMember}
        />
      )}
      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-lg font-semibold">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will remove{" "}
              <span className="font-medium text-foreground">
                {memberToRemove?.name}
              </span>{" "}
              from the team?
              <p className="mt-1 text-sm font-light italic text-muted-foreground">
                (This action cannot be undone.)
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="w-full sm:w-auto">
              Keep Member
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="w-full bg-destructive hover:bg-destructive/90 sm:w-auto"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TeamMemberTable;
