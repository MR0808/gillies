'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
    className?: string;
    text?: string;
    size?: btnSize;
    isPending: boolean;
    disabledCheck?: boolean;
};

type ProfileButtonProps = {
    text?: string;
    newImage: boolean;
    isPending: boolean;
};

export const SubmitButton = ({
    className = '',
    text = 'submit',
    size = 'lg',
    isPending,
    disabledCheck = true
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isPending || !disabledCheck}
            className={cn('capitalize', className)}
            size={size}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
};

export function ProfileButton({
    text = 'submit',
    newImage,
    isPending
}: ProfileButtonProps) {
    return (
        <Button
            type="submit"
            disabled={!newImage || isPending}
            className="cursor-pointer"
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
}
