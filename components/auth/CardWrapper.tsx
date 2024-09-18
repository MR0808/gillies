'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '@/components/ui/card';
import Header from '@/components/auth/Header';
import BackButton from '@/components/auth/BackButton';

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    backButton?: boolean;
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    backButton = false
}: CardWrapperProps) => {
    return (
        <Card className="w-[320px] sm:w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {backButton && (
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            )}{' '}
        </Card>
    );
};

export default CardWrapper;
