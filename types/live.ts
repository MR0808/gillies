import { getLiveWhiskyScores } from '@/actions/live';

export type WhiskyLive = NonNullable<
    Awaited<ReturnType<typeof getLiveWhiskyScores>>
>;
