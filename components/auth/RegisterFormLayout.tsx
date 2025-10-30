'use client';

import * as z from 'zod';
import { useState, useEffect, useCallback, useTransition } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { RegisterSchema } from '@/schemas/auth';

import FormError from '@/components/form/FormError';
import FormSuccess from '../form/FormSuccess';
import RegisterForm from './RegisterForm';
import { registerVerification, registerPassword } from '@/actions/register';
import Link from 'next/link';

const RegisterFormLayout = () => {
    const [tokenError, setTokenError] = useState<string | undefined>();
    const [tokenSuccess, setTokenSuccess] = useState<string | undefined>();
    const [formError, setFormError] = useState<string | undefined>();
    const [formSuccess, setFormSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onPageLoad = useCallback(async () => {
        if (tokenSuccess || tokenError) return;

        if (!token) {
            setTokenError('Missing token!');
            return;
        }

        const data = await registerVerification(token);
        setTokenSuccess(data.success);
        setTokenError(data.error);
    }, [token, tokenSuccess, tokenError]);

    useEffect(() => {
        onPageLoad();
    }, [onPageLoad]);

    if (!token) {
        return (
            <div className="flex flex-col items-center w-full justify-center">
                <FormError message="Missing token" />
            </div>
        );
    }

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setFormError('');
        setFormSuccess('');

        startTransition(async () => {
            const data = await registerPassword(values, token);
            setFormError(data.error);
            setFormSuccess(data.success);
        });
    };

    return (
        <>
            {!tokenSuccess && !tokenError ? (
                <div className="flex flex-col items-center w-full justify-center">
                    <BeatLoader />
                </div>
            ) : tokenError ? (
                <FormError message="Sorry, there was an issue loading your registration, please try again" />
            ) : formSuccess ? (
                <div className="flex flex-col items-center w-full justify-center gap-2">
                    <FormSuccess message={formSuccess} />
                    <Link href="/auth/login">Login now</Link>
                </div>
            ) : (
                <RegisterForm
                    onSubmit={onSubmit}
                    isPending={isPending}
                    error={formError}
                />
            )}
        </>
    );
};

export default RegisterFormLayout;
