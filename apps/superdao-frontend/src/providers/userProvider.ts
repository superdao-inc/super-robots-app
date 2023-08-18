import { createContext } from 'react';

type User = { loading: boolean; userId: string } | null;

export const UserContext = createContext<User>(null);
