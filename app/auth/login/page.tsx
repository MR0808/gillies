import { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import LoginForm from '@/components/auth/LoginForm';
import { isLoggedIn } from '@/lib/authCheck';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
});

export function generateMetadata(): Metadata {
    return {
        title: 'Login',
        description: 'Gillies Login'
    };
}

const LoginPage = async () => {
    await isLoggedIn();

    return (
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
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
};
export default LoginPage;
