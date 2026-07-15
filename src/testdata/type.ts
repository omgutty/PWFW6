export interface User {
    id: string;
    role: string;
    username: string;
    password: string;
}

export interface UsersData {
    ptaLive: User[];
    ptaTest: User[];
    pknLive: User[];
    invalidUsers: User[];
}