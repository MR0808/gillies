import { Suspense } from 'react';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import RegisterFormLayout from '@/components/auth/RegisterFormLayout';

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
});

export function generateMetadata(): Metadata {
    return {
        title: 'Register',
        description: 'Gillies Register'
    };
}

const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">
                            <div
                                className={cn(
                                    'text-2xl text-center font-semibold mb-5',
                                    font.className
                                )}
                            >
                                🥃 Gillies Voting System
                            </div>
                            Welcome aboard
                        </CardTitle>
                        <CardDescription>
                            Thanks for confirming your registration. Please
                            enter your email and create a password below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterFormLayout />
                    </CardContent>
                </Card>
            </div>
        </Suspense>
    );
};
export default RegisterPage;
