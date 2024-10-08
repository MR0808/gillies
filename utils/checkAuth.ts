import { currentUser } from '@/lib/auth';

 const checkAuth = async (admin:boolean) => {
    const user = await currentUser();

    if (!user) return false;

    if (admin && user.role !== 'ADMIN') return false;

    return user

}

export default checkAuth