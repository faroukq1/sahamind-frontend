import { UserRole } from "./user";

export interface Psychiatrist {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  is_available: boolean | null;
  role: UserRole; // "psychiatrist"
  specialty: string | null;
  keywords: string[];
  mood: string | null;
  problem_keywords: string[] | null;
}

export interface PsychiatristsResponse {
  count: number;
  psychiatrists: Psychiatrist[];
}
