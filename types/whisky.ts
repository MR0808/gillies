import { getWhiskyDetails } from '@/actions/whiskies';

export type GetWhiskyDetailsReturn = Awaited<
    ReturnType<typeof getWhiskyDetails>
>;

export type WhiskyDetails = NonNullable<
    Extract<GetWhiskyDetailsReturn, { data: unknown }>['data']
>;

export type WhiskyReviews = NonNullable<
    Extract<WhiskyDetails, { reviews: unknown }>['reviews']
>;

export type WhiskyStats = NonNullable<
    Extract<WhiskyDetails, { stats: unknown }>['stats']
>;

export interface WhiskyDetailHeaderProps {
    whisky: WhiskyDetails;
}

export interface WhiskyStatisticsProps {
    stats: WhiskyStats;
}

export interface WhiskyChartsProps {
    reviews: WhiskyReviews;
}

export interface WhiskyVotesTableProps {
    reviews: WhiskyReviews;
    whiskyName: string;
}
