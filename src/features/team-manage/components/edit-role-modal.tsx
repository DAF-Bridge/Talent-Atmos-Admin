import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Moderator";
  avatarUrl: string;
};

type EditRoleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
  onEditRole: (newRole: "Owner" | "Moderator") => void;
//   onRemoveMember: (id: string) => void;
};

export function EditRoleModal({
  isOpen,
  onClose,
  member,
  onEditRole,
//   onRemoveMember,
}: Readonly<EditRoleModalProps>) {
  const [selectedRole, setSelectedRole] = useState(member.role);

  const handleSave = () => {
    onEditRole(selectedRole);
    onClose();
  };

//   const handleRemove = () => {
//     onRemoveMember(member.id);
//     onClose();
//   };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value: "Owner" | "Moderator") =>
                setSelectedRole(value)
              }
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          {/* <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={handleRemove}
          >
            Remove
          </Button> */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
