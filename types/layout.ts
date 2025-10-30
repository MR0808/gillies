import type { ReactNode } from 'react';
import { SessionType } from '@/types/session';

export interface PortalLayoutProps {
    userSession: SessionType;
    children: ReactNode;
}

export interface UserNavProps {
    userSession: SessionType;
}
