import { User } from '@prisma/client';

import { Icons } from '@/components/global/Icons';

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface MemberCellActionProps {
    data: User;
}

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ result: boolean | null; message: string }>;

export interface Whiskies {
    id: string;
    name: string;
    description: string | null;
    quaich: boolean;
    reviews: {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        comment: string;
        whiskyId: string;
    }[];
}

export interface Whisky {
    whisky: {
        id: string;
        name: string;
        description: string | null;
        image: string | null;
        quaich: boolean;
        order: number | null;
        meetingId: string;
    };
    rating: number;
    comment: string;
    id: string;
}
