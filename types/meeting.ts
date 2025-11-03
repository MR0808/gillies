import { getMeeting } from '@/actions/meetings';
import { getMembersFirstName } from '@/actions/members';

export type GetMeetingReturn = Awaited<ReturnType<typeof getMeeting>>;

export type Meeting = NonNullable<
    Extract<GetMeetingReturn, { data: unknown }>['data']
>;

export type Whisky =
    Awaited<ReturnType<typeof getMeeting>> extends infer R
        ? R extends { data: infer D }
            ? D extends { whiskies: infer W extends any[] }
                ? W[number]
                : never
            : never
        : never;

export type Member =
    Awaited<ReturnType<typeof getMeeting>> extends infer R
        ? R extends { data: infer D }
            ? D extends { users: infer U extends any[] }
                ? U[number]
                : never
            : never
        : never;

export type GetMembersFirstNameReturn = Awaited<
    ReturnType<typeof getMembersFirstName>
>;

export type Members = Extract<
    GetMembersFirstNameReturn,
    { data: unknown }
>['data'];

export interface MeetingsTableProps {
    meetings: Meeting[];
}

export interface MeeetingManagerProps {
    meeting: Meeting;
    members: Members;
}

export interface WhiskyManagerProps {
    meeting: Meeting;
}

export interface WhiskyCardProps {
    whisky: Whisky;
    onEdit: (whisky: Whisky) => void;
}

export interface WhiskyDialogProps {
    open: boolean;
    onClose: () => void;
    whisky: Whisky | null;
    meetingId: string;
    currentQuaichId: string | null;
    existingOrders: number[];
}

export interface MemberManagerProps {
    meeting: Meeting;
    members: Members;
}

export interface CloseMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    meetingId: string;
}
