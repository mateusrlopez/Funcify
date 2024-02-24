type UserSchema = {
    id: string;
    email: string;
    role: "ADMIN" | "COMMON";
    createdAt: string;
};

type CreateUser = Omit<UserSchema, "id" | "createdAt"> & {
    password: string;
};

type UpdateUser = Omit<UserSchema, "id" | "createdAt">;

type GetAllUsers = {
    users: Array<UserSchema>;
};
