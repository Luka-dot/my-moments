export interface Entry {
    id: string;
    title: string;
    description: string;
    date: string;
    pictureUrl: string;
};

export interface Account {
    id: string;
    email: string;
    userName: string;
    createdAt: string;
    pictureUrl: string;
};

export interface Event {
    id: string;
    name: string;
};

export function toEntry(doc): any {
    return { id: doc.id, ...doc.data() };
};

export function toAccount(doc): Account {
    return { id: doc.id, ...doc.data() };
};
export function toAccountDet(doc): any {
    return { ...doc.data() };
};