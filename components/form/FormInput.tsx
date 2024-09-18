import { forwardRef } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
};

export const FormInput = ({
    label,
    name,
    type,
    defaultValue,
    placeholder
}: FormInputProps) => {
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">
                {label || name}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export const AccountFormInput = forwardRef<HTMLInputElement, FormInputProps>(
    function AccountFormInput({ name, type, placeholder, ...props }, ref) {
        return (
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                {...props}
                className={cn('rounded-xl py-3 px-6 text-sm font-normal h-12')}
            />
        );
    }
);
