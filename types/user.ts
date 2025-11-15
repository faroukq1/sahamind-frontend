export type UserRole = "patient" | "psychiatrist" | "admin" | "benevole";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  username: string | null;
  is_active: boolean;
  is_available?: boolean | null; // benevole only
  specialty?: string | null; // psychiatrist only
  mood?: string | null; // patient only
  keywords?: string[]; // all users
  problem_keywords?: string[] | null; // patient only
}
