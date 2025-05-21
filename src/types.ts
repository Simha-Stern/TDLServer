export type User = {
    id?: number;
    email: string;
    password: string;
    name: string;
}

export type Task = {
    id?: number;
    user_id: number;
    title: string;
    completed: boolean;
}
