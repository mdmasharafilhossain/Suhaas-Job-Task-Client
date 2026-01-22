export type Role = "ADMIN" | "MANAGER" | "STAFF";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  entity: string;
  entityId: string;
  createdAt: string;
}
