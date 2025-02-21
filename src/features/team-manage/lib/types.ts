export type TeamMember = {
  role: "owner" | "moderator";
  user: {
    id: string;
    name: string;
    picUrl: string;
    email: string;
    role: string;
    updatedAt: string;
  };
};
