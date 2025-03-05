import { auth } from '@/auth';

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};

export const checkAuthenticated = async (admin = false) => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    if (admin && user.role !== 'ADMIN') {
        return null;
    }

    return user;
};
