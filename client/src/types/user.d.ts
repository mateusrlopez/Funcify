import { UserSchema as UserZodSchema } from "@/schemas/user";
import { z } from "zod";

type UserSchema = z.infer<typeof UserZodSchema>;

type CreateUser = Omit<UserSchema, "id" | "createdAt"> & {
    password: string;
};

type UpdateUser = Omit<UserSchema, "id" | "createdAt">;

type GetAllUsers = {
    users: Array<UserSchema>;
};
