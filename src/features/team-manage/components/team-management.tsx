"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./search-bar";
import { AddMemberModal } from "./add-member-modal";
import { Button } from "@/components/ui/button";
import { TeamMemberTable } from "./team-member-table";
import { TeamMember } from "../lib/types";
import { toast } from "@/hooks/use-toast";
import {
  editUserRole,
  fetchOrgMembers,
  inviteUser,
  removeMember,
} from "../api/action";

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFetchingMembers, setIsFetchingMembers] = useState(false);

  const filteredMembers = members.filter(
    (member) =>
      member.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFetchOrgMembers = async () => {
    setIsFetchingMembers(true);
    try {
      const data = await fetchOrgMembers("1"); // Assuming '1' is the orgId
      console.log(data);
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsFetchingMembers(false);
    }
  };

  useEffect(() => {
    handleFetchOrgMembers();
  }, []);

  const handleAddMember = async (email: string) => {
    try {
      const result = await inviteUser("1", { email });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Member added",
        description: "The member has been added successfully.",
      });

      await handleFetchOrgMembers();
    } catch (error) {
      console.error("Error adding member:", error);
      if (error instanceof Error) {
        toast({
          title: "Error adding member",
          description: error.toString(),
          variant: "destructive",
        });
      }
    }
  };

  const handleEditRole = async (
    userId: string,
    newRole: "owner" | "moderator"
  ) => {
    try {
      const result = await editUserRole("1", {
        user_id: userId,
        role: newRole,
      });

      if (!result.success) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Role updated",
        description: "The role has been updated successfully.",
      });

      await handleFetchOrgMembers();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          title: "Failed to update role",
          variant: "destructive",
          description: error.toString(),
        });
      }
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      const result = await removeMember("1", { user_id: userId });

      if (!result.success) {
        throw new Error(result.error.message);
      }

      console.log(result.message);
      toast({
        title: "Member removed",
        description: "The member has been removed successfully.",
      });
    } catch (error) {
      console.error("Error removing member:", error);
      toast({
        title: "Error removing member",
        description: "An error occurred while removing the member.",
        variant: "destructive",
      });
    }
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
        isLoading={isFetchingMembers}
      />
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
}
