'use client';

import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import verification from '@/actions/verification'

const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError('Missing token!');
            return;
        }

        verification(token)
            .then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                }
                setError(data.error);
            })
            .catch(() => {
                setError('Something went wrong!');
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    
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
            backButton={success}
        >
            {!success && !error ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : error ? (
                <FormError message={error} />
            ) : (
                <div className="flex flex-col items-center w-full justify-center">
                    <FormSuccess message="Email verified!" />
                </div>
            )}
        </CardWrapper>
    );
};

export default VerificationForm;
