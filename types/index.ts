import { User, Status } from '@/generated/prisma/client';;

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
    image: string | null;
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

export interface Rating {
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

export interface Meeting {
    id: string;
    date: string;
    location: string;
    status: Status;
    quaich: string | null;
    whiskies: {
        id: string;
        quaich: boolean;
        name: string;
        description: string | null;
        image: string | null;
        order: number | null;
        meetingId: string;
    }[];
    users: {
        id: string;
        image: string | null;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
    }[];
}

export interface MeetingWhiskies {
    id: string;
    quaich: boolean;
    name: string;
    description: string | null;
    image: string | null;
    order: number | null;
    meetingId: string;
}

export interface MeetingMembers {
    id: string;
    image: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
}

export interface Results {
    meetingId: string;
    meetingName: string;
    meetingDate: string;
    whiskies: {
        name: string;
        average: number;
        count: number;
        max: number;
        min: number;
    }[];
}

export interface ResultsWhiskies {
    name: string;
    average: number;
    count: number;
    max: number;
    min: number;
}

export interface Scoreboard {
    whiskyId: string;
    whiskyName: string;
    whiskyImage: string;
    average: number;
    count: number;
    max: number;
    min: number;
}

export interface ReviewsScoreboard {
    user: {
        id: string;
        image: string | null;
        name: string | null;
        lastName: string | null;
    };
    id: string;
    rating: number;
    comment: string;
}
