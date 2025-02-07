export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Moderator";
  avatarUrl: string;
};
