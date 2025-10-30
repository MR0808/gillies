import { getMeetingResults } from '@/actions/results';

export type Whisky = Extract<
    Awaited<ReturnType<typeof getMeetingResults>>,
    { meeting: { whiskies: any[] } }
>['meeting']['whiskies'][number];

export type Review = Extract<
    Awaited<ReturnType<typeof getMeetingResults>>,
    { meeting: any }
>['meeting']['whiskies'][number]['reviews'][number];

export type ResultsTableProps = {
    whiskies: Whisky[];
    quaichId: string | null;
};

export type ResultsChartsProps = {
    whiskies: Whisky[];
};
