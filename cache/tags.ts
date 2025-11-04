// /lib/cache/tags.ts
/**
 * Global cache tag definitions for use in both unstable_cache and revalidateTag.
 */
export const TAGS = {
    meetings: 'meetings',
    meeting: (id: string) => `meeting:${id}`,
    meetingResults: (id: string) => `meeting-results:${id}`,
    meetingWhiskies: (id: string) => `meeting-whiskies:${id}`,
    meetingWhisky: (meetingId: string, whiskyId: string) =>
        `whisky-details:${meetingId}:${whiskyId}`,
    whisky: (id: string) => `whisky:${id}`,
    members: 'members',
    reviews: 'reviews'
};
