import { NavItem } from '@/types';

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        label: 'Dashboard'
    },
    {
        title: 'Members',
        href: '/dashboard/members',
        icon: 'users',
        label: 'members'
    },
    {
        title: 'Meetings',
        href: '/dashboard/meetings',
        icon: 'calendarCheck',
        label: 'meetings'
    }
];
