'use client';
import { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { AlertModalProps } from '@/types';

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Are you sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    {loading ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </>
                    ) : (
                        <>Continue</>
                    )}
                </Button>
            </div>
        </Modal>
    );
};

export default AlertModal;
