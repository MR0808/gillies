import { Suspense } from 'react';

import RegisterFormLayout from '@/components/auth/RegisterFormLayout';

const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <RegisterFormLayout />
        </Suspense>
    );
};
export default RegisterPage;
