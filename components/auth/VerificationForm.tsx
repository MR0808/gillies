'use client';

import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';
import { useVerifyEmail } from '@/features/verification/useVerifyEmail';

const VerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || undefined;

    const verifyQuery = useVerifyEmail(token);
    const isLoading = verifyQuery.isPending;
    const loaded = verifyQuery.isSuccess;

    if (!token) {
        return (
            <CardWrapper
                headerLabel="Welcome to the Gillies Voting System"
                backButtonLabel="Already registered? Login"
                backButtonHref="/auth/login"
            >
                <div className="flex flex-col items-center w-full justify-center">
                    <FormError message="Missing token" />
                </div>
            </CardWrapper>
        );
    }

    return (
        <CardWrapper
            headerLabel="Email Verification"
            backButtonLabel="Now you can login"
            backButtonHref="/auth/login"
            backButton={loaded}
        >
            {isLoading ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : verifyQuery.isError ? (
                <FormError message={verifyQuery.error.message} />
            ) : (
                <div className="flex flex-col items-center w-full justify-center">
                    <FormSuccess message="Email verified!" />
                </div>
            )}
        </CardWrapper>
    );
};

export default VerificationForm;
