'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { toast } from 'sonner';
import { actionFunction } from '@/types';

const initialState = {
    result: null,
    message: ''
};

const FormContainer = ({
    action,
    children,
    sendDataToParent
}: {
    action: actionFunction;
    children: React.ReactNode;
    sendDataToParent: (data: string) => void;
}) => {
    const [state, formAction] = useFormState(action, initialState);
    const { update } = useSession();
    useEffect(() => {
        if (state.result && state.message) {
            update();
            toast.success(state.message);
            sendDataToParent('updated');
        }
        if (!state.result && state.message) {
            toast.error(state.message);
        }
    }, [state]);
    return <form action={formAction}>{children}</form>;
};
export default FormContainer;
