'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendRegistrationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/register?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: 'Gillies Voting System - Register your account',
        html: `<p>Click <a href="${confirmLink}">here</a> to register your account and create a password.</p>`
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/verification?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/newpassword?token=${token}`;

    await resend.emails.send({
        from: process.env.NEXT_PUBLIC_APP_EMAIL as string,
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    });
};
