export type UserRole = "admin" | "client" | "super_admin";

export interface User {
    _id: string;
    username: string;
    email: string;
    role: UserRole;
    bio?: string;
    sosialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
    };
    avatarUrl?: string;
    isActive?: string;
    __v?: number;
    createdAt: Date;
    updatedAt: Date;
}