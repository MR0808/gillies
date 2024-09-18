'use client';

import * as z from 'zod';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { RegisterSchema } from '@/schemas/auth';

import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';
import { useVerifyRegistration } from '@/features/register/useVerifyRegistration';
import { useRegisterMember } from '@/features/register/useRegisterMember';
import RegisterForm from './RegisterForm';

const RegisterFormLayout = () => {
    const searchParams = useSearchParams();
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const token = searchParams.get('token') || undefined;

    const verifyQuery = useVerifyRegistration(token);
    const isLoading = verifyQuery.isPending;

    const mutationRegister = useRegisterMember(token);

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

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setIsPending(true);
        mutationRegister.mutate(values, {
            onSuccess: () => {
                setSuccess(
                    'Registration successful, please login to set up your account.'
                );
            },
            onError: (error) => {
                setIsPending(false);
                setError(error.message);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome to the Gillies Voting System"
            backButtonLabel="Already registered? Login"
            backButtonHref="/auth/login"
        >
            {isLoading ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : verifyQuery.isError ? (
                <FormError message="Sorry, there was an issue loading your registration, please try again" />
            ) : success ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <FormSuccess message={success} />
                </div>
            ) : (
                <RegisterForm
                    onSubmit={onSubmit}
                    isPending={isPending}
                    error={error}
                />
            )}
        </CardWrapper>
    );
};

export default RegisterFormLayout;
