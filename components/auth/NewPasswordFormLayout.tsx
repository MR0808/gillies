'use client';

import * as z from 'zod';
import { useState, useEffect, useCallback, useTransition } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { ResetPasswordSchema } from '@/schemas/auth';

import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';
import NewPasswordForm from './NewPasswordForm';
import { verifyPasswordToken, updatePassword } from '@/actions/resetPassword';

const NewPasswordFormLayout = () => {
    const [tokenError, setTokenError] = useState<string | undefined>();
    const [tokenSuccess, setTokenSuccess] = useState<string | undefined>();
    const [formError, setFormError] = useState<string | undefined>();
    const [formSuccess, setFormSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onPageLoad = useCallback(() => {
        if (tokenSuccess || tokenError) return;

        if (!token) {
            setTokenError('Missing token!');
            return;
        }

        verifyPasswordToken(token)
            .then((data) => {
                setTokenSuccess(data.success);
                setTokenError(data.error);
            })
            .catch(() => {
                setTokenError('Something went wrong!');
            });
    }, [token, tokenSuccess, tokenError]);

    useEffect(() => {
        onPageLoad();
    }, [onPageLoad]);

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
        setFormError("");
        setFormSuccess("");

        startTransition(() => {
            updatePassword(values).then((data) => {
                setFormError(data.error);
                setFormSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Reset your password"
            backButtonLabel="Remember your password? Login"
            backButtonHref="/auth/login"
        >
            {!tokenSuccess && !tokenError ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : tokenError ? (
                <FormError message={tokenError} />
            ) : formSuccess ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <FormSuccess message={formSuccess} />
                </div>
            ) : (
                <NewPasswordForm
                    onSubmit={onSubmit}
                    isPending={isPending}
                    error={formError}
                />
            )}
        </CardWrapper>
    );
};

export default NewPasswordFormLayout;
