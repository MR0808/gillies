'use client';

import type { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SessionProps } from '@/types/session';
import {
    ChangeEmailSchema,
    VerifyEmailChangeOTPSchema
} from '@/schemas/settings';
import { authClient, useSession } from '@/lib/auth-client';
import maskEmail from '@/utils/maskEmail';
import { sendEmailChangeOTP, verifyEmailChangeOTP } from '@/actions/email';
import { cn } from '@/lib/utils';

type Step = 'input' | 'verify' | 'success';

const EmailSettings = ({ userSession }: SessionProps) => {
    const [step, setStep] = useState<Step>('input');
    const [user, setUser] = useState(userSession?.user);
    const [error, setError] = useState({ error: false, message: '' });
    const [currentEmail, setCurrentEmail] = useState(
        userSession?.user.email || 'user@example.com'
    );
    const [newEmail, setNewEmail] = useState('');
    const [maskedEmail, setMaskedEmail] = useState('');
    const [cooldownTime, setCooldownTime] = useState(0);
    const [isPendingInput, startTransitionInput] = useTransition();
    const [isPendingVerify, startTransitionVerify] = useTransition();
    const { data, refetch } = useSession();

    useEffect(() => {
        if (data && data.user) {
            setCurrentEmail(data?.user.email);
        }
    }, [data]);

    const handleStartOver = () => {
        setStep('input');
        setNewEmail('');
        setMaskedEmail('');
        setCooldownTime(0);
        setError({ error: false, message: '' });
    };

    const formInput = useForm<z.infer<typeof ChangeEmailSchema>>({
        resolver: zodResolver(ChangeEmailSchema),
        defaultValues: {
            currentEmail,
            newEmail: ''
        }
    });

    const onSubmitInput = (values: z.infer<typeof ChangeEmailSchema>) => {
        startTransitionInput(async () => {
            const data = await sendEmailChangeOTP(values);
            if (!data.success) {
                setError({ error: true, message: data.message });
            }
            if (data.cooldownTime) {
                setCooldownTime(data.cooldownTime);

                const interval = setInterval(() => {
                    setCooldownTime((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                clearInterval(interval);
            }
            if (data.success) {
                formVerify.setValue('newEmail', values.newEmail);
                setError({ error: false, message: '' });
                setStep('verify');
                setNewEmail(values.newEmail);
                setMaskedEmail(maskEmail(values.newEmail));
            }
        });
    };

    const onErrorInput: SubmitErrorHandler<
        z.infer<typeof ChangeEmailSchema>
    > = (errors) => {
        setError({ error: true, message: errors.newEmail?.message || '' });
    };

    const formVerify = useForm<z.infer<typeof VerifyEmailChangeOTPSchema>>({
        resolver: zodResolver(VerifyEmailChangeOTPSchema),
        defaultValues: {
            currentEmail,
            newEmail,
            otp: ''
        }
    });

    const onSubmitVerify = (
        values: z.infer<typeof VerifyEmailChangeOTPSchema>
    ) => {
        startTransitionVerify(async () => {
            const data = await verifyEmailChangeOTP(values);
            if (!data.success) {
                setError({ error: true, message: data.message });
            }
            if (data.success) {
                await authClient.getSession({
                    query: {
                        disableCookieCache: true
                    }
                });
                refetch();
                setError({ error: false, message: '' });
                setStep('success');
            }
        });
    };

    const onErrorVerify: SubmitErrorHandler<
        z.infer<typeof VerifyEmailChangeOTPSchema>
    > = (errors) => {
        setError({ error: true, message: errors.newEmail?.message || '' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>
                    Update your email address. You'll need to verify the new
                    email.
                    <br />
                    Current email:{' '}
                    <span className="font-medium">{currentEmail}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 'input' && (
                    <Form {...formInput}>
                        <form
                            onSubmit={formInput.handleSubmit(
                                onSubmitInput,
                                onErrorInput
                            )}
                            noValidate
                            className="space-y-4"
                        >
                            {error.error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {error.message}
                                        {cooldownTime > 0 && (
                                            <div className="flex items-center gap-1 mt-2">
                                                <Clock className="h-3 w-3" />
                                                <span className="text-xs">
                                                    Try again in {cooldownTime}{' '}
                                                    seconds
                                                </span>
                                            </div>
                                        )}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <FormField
                                    control={formInput.control}
                                    name="newEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mb-6">
                                                New Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Enter your new email address"
                                                    disabled={isPendingInput}
                                                    className="w-full md:w-1/5"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isPendingInput || cooldownTime > 0}
                            >
                                {isPendingInput || cooldownTime > 0 ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Send Verification Code'
                                )}
                            </Button>
                        </form>
                    </Form>
                )}
                {step === 'verify' && (
                    <div className="space-y-4">
                        {!error.error && (
                            <Alert>
                                <AlertDescription>
                                    A verification code has been sent to your
                                    new email address ({maskedEmail}). Please
                                    enter it below.
                                </AlertDescription>
                            </Alert>
                        )}

                        {error.error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {error.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Form {...formVerify}>
                            <form
                                className="space-y-4"
                                onSubmit={formVerify.handleSubmit(
                                    onSubmitVerify,
                                    onErrorVerify
                                )}
                            >
                                <div className="space-y-2">
                                    <FormField
                                        control={formVerify.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem
                                                className={cn(
                                                    'w-full justify-center'
                                                )}
                                            >
                                                <FormControl>
                                                    <div className="flex">
                                                        <InputOTP
                                                            maxLength={6}
                                                            {...field}
                                                        >
                                                            <InputOTPGroup>
                                                                <InputOTPSlot
                                                                    index={0}
                                                                    className="border-gray-400"
                                                                />
                                                                <InputOTPSlot
                                                                    index={1}
                                                                    className="border-gray-400"
                                                                />
                                                                <InputOTPSlot
                                                                    index={2}
                                                                    className="border-gray-400"
                                                                />
                                                                <InputOTPSlot
                                                                    index={3}
                                                                    className="border-gray-400"
                                                                />
                                                                <InputOTPSlot
                                                                    index={4}
                                                                    className="border-gray-400"
                                                                />
                                                                <InputOTPSlot
                                                                    index={5}
                                                                    className="border-gray-400"
                                                                />
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button disabled={isPendingVerify}>
                                        {isPendingVerify ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            'Verify email'
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleStartOver}
                                        disabled={isPendingVerify}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                )}
                {step === 'success' && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-green-700">
                                Email Updated!
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Your email has been successfully changed to{' '}
                                <span className="font-medium">{newEmail}</span>
                            </p>
                        </div>
                        <Button
                            onClick={handleStartOver}
                            variant="outline"
                            className="w-full md:w-1/5"
                        >
                            Change
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EmailSettings;
