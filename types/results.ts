import { getMeetingResults } from '@/actions/results';

export type MeetingResults = Awaited<ReturnType<typeof getMeetingResults>>;

export type Whisky = NonNullable<MeetingResults['data']>['whiskies'][number];

export type Review = Whisky['reviewers'][number];

export type ResultsTableProps = {
    whiskies: Whisky[];
    quaichId: string | null;
    meetingId: string;
};

export type ResultsChartsProps = {
    whiskies: Whisky[];
};
