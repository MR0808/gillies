'use server';

import EmailOTPEmailTemplate from '@/emails/email-otp';
import PasswordResetConfirmationEmailTemplate from '@/emails/password-reset-confirmation';
import ResetPasswordEmailTemplate from '@/emails/reset-password';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
const from = `${process.env.NEXT_PUBLIC_APP_NAME as string} <${process.env.NEXT_PUBLIC_APP_EMAIL as string}>`;

export const sendResetEmail = async ({
    email,
    link,
    name
}: {
    email: string;
    link: string;
    name: string;
}) => {
    await resend.emails.send({
        from,
        to: email,
        subject: 'Gillies Voting Portal - Reset password',
        react: ResetPasswordEmailTemplate({ name, link })
    });
};

export const sendVerificationEmail = async ({
    email,
    otp,
    name
}: {
    email: string;
    otp: string;
    name: string;
}) => {
    const sent = await resend.emails.send({
        from,
        to: email,
        subject: 'Gillies Voting Portal - Confirm your email',
        react: EmailOTPEmailTemplate({ name, otp })
    });

    return sent;
};

export const sendPasswordResetNotificationEmail = async ({
    email,
    name
}: {
    email: string;
    name: string;
}) => {
    await resend.emails.send({
        from,
        to: email,
        subject: 'Gillies Voting Portal - Your password has been reset',
        react: PasswordResetConfirmationEmailTemplate({ name })
    });
};

// Old Emails, check at end

export const sendRegistrationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/register?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: 'Gillies Voting System - Register your account',
        html: `<p>Click <a href="${confirmLink}">here</a> to register your account and create a password.</p>`
    });
};
