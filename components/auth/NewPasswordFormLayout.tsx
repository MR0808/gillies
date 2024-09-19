'use client';

import * as z from 'zod';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { ResetPasswordSchema } from '@/schemas/auth';

import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';
import { useVerifyPassword } from '@/features/forgotpassword/useVerifyPassword';
import { useUpdatePassword } from '@/features/forgotpassword/useUpdatePassword';
import NewPasswordForm from './NewPasswordForm';

const NewPasswordFormLayout = () => {
    const searchParams = useSearchParams();
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const token = searchParams.get('token') || undefined;

    const verifyQuery = useVerifyPassword(token);
    const isLoading = verifyQuery.isPending;

    const mutation = useUpdatePassword(token);

    if (!token) {
        return (
            <CardWrapper
                headerLabel="Welcome to the Gillies Voting System"
                backButtonLabel="Already registered? Login"
                backButtonHref="/auth/login"
                backButton={true}
            >
                <div className="flex flex-col items-center w-full justify-center">
                    <FormError message="Missing token" />
                </div>
            </CardWrapper>
        );
    }

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setIsPending(true);
        mutation.mutate(values, {
            onSuccess: () => {
                setSuccess('Password reset successful, please login.');
            },
            onError: (error) => {
                setIsPending(false);
                setError(error.message);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Reset your password"
            backButtonLabel="Remember your password? Login"
            backButtonHref="/auth/login"
        >
            {isLoading ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : verifyQuery.isError ? (
                <FormError message={verifyQuery.error.message} />
            ) : success ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <FormSuccess message={success} />
                </div>
            ) : (
                <NewPasswordForm
                    onSubmit={onSubmit}
                    isPending={isPending}
                    error={error}
                />
            )}
        </CardWrapper>
    );
};

export default NewPasswordFormLayout;
