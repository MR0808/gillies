import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <Link
                        href="/auth/login"
                        className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                    <CardTitle className="text-2xl font-bold">
                        Reset password
                    </CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to
                        reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
