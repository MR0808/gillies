import { redirect } from 'next/navigation';

import { isLoggedIn } from '@/lib/authCheck';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { verifyPasswordToken } from '@/actions/resetPassword';

const ResetPasswordPage = async ({
    searchParams
}: {
    searchParams: Promise<{ token: string }>;
}) => {
    await isLoggedIn();

    const token = (await searchParams).token;

    if (!token) redirect('/auth/login');

    const verifyToken = await verifyPasswordToken(token);

    if (!verifyToken.valid) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Invalid Link</CardTitle>
                        <CardDescription>
                            This password reset link is invalid or has expired.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Set new password
                    </CardTitle>
                    <CardDescription>
                        Enter your new password below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm token={token} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
