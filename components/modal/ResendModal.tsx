'use client';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

const ResendModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
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
            title="Resending invite"
            description=""
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col w-full items-center justify-end space-x-2 gap-y-3">
                {loading ? (
                    <>
                        <div>Please wait while we send the invite</div>
                        <div>
                            <BeatLoader />
                        </div>
                    </>
                ) : (
                    <div>Invite resent</div>
                )}
                <Button disabled={loading} onClick={onClose}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default ResendModal;
