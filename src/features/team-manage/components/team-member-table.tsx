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
import { ChevronDown } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Moderator";
  avatarUrl: string;
};

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
                  onClick={() => onRemoveMember(member.id)}
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
    </>
  );
}

export default TeamMemberTable;
