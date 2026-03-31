export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "online" | "offline" | "away";
  email: string;
  skills: string[];
  hireDate?: string;
}
