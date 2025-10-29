import { getMeetingWhiskies } from '@/actions/voting';

/* 1. Resolve the promise */
type Resolved = Awaited<ReturnType<typeof getMeetingWhiskies>>;

/* 2. Pull out the object that has a `data` array (the success case) */
type Success = Extract<Resolved, { data: any[] }>;

/* 3. Get the element type of that array */
export type Whisky = Success['data'][number];

export interface WhiskyVotingProps {
    whiskies: Whisky[];
}

export interface WhiskyCardProps {
    whisky: Whisky;
}
