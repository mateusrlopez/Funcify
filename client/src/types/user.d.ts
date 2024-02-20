type User = {
    id: string;
    email: string;
    role: "ADMIN" | "COMMON";
    createdAt: string;
};

type CreateUser = Omit<User, "id" | "createdAt"> & {
    password: string;
};

type UpdateUser = Omit<User, "id" | "createdAt">;

type GetAllUsers = Array<User>;
