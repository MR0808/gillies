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
import Link from 'next/link';

const NewPasswordFormLayout = ({ token }: { token: string }) => {
    const [tokenError, setTokenError] = useState<string | undefined>();
    const [tokenSuccess, setTokenSuccess] = useState<string | undefined>();
    const [formError, setFormError] = useState<string | undefined>();
    const [formSuccess, setFormSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const onPageLoad = useCallback(async () => {
        if (tokenSuccess || tokenError) return;

        const data = await verifyPasswordToken(token);
        setTokenSuccess(data.success);
        setTokenError(data.error);
    }, [token, tokenSuccess, tokenError]);

    useEffect(() => {
        onPageLoad();
    }, [onPageLoad]);

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setFormError('');
        setFormSuccess('');

        startTransition(async () => {
            const data = await updatePassword(values, token);
            setFormError(data.error);
            setFormSuccess(data.success);
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
                    <Link href="/auth/login">Login</Link>
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
