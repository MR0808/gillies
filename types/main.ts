import { getUserMeetings } from '@/actions/voting';

export type GetUserMeetingsReturn = Awaited<ReturnType<typeof getUserMeetings>>;

export type Meetings = Extract<
    GetUserMeetingsReturn,
    { data: unknown }
>['data'];

export interface MeetingSelectorProps {
    meetings: Meetings | undefined;
}
