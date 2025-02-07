"use client";

import { useState } from "react";
import { SearchBar } from "./search-bar";
import { AddMemberModal } from "./add-member-modal";
import { Button } from "@/components/ui/button";
import { TeamMemberTable } from "./team-member-table";
import { TeamMember } from "../lib/types";

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Moderator",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  // Add more dummy data as needed
];

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (email: string) => {
    const newMember: TeamMember = {
      id: (members.length + 1).toString(),
      name: email.split("@")[0], // Use part of email as name for demo
      email,
      role: "Moderator",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    };
    setMembers([...members, newMember]);
    setIsAddModalOpen(false);
  };

  const handleEditRole = (id: string, newRole: "Owner" | "Moderator") => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <SearchBar onSearch={setSearchTerm} />
        <Button onClick={() => setIsAddModalOpen(true)}>Add Member</Button>
      </div>
      <TeamMemberTable
        members={filteredMembers}
        onEditRole={handleEditRole}
        onRemoveMember={handleRemoveMember}
      />
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
}
