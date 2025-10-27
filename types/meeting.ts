import { getMeeting } from '@/actions/meetings';

export type GetMeetingReturn = Awaited<ReturnType<typeof getMeeting>>;
export type Meeting = Extract<GetMeetingReturn, { data: unknown }>['data'];
