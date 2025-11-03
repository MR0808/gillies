// /lib/cache/tags.ts
/**
 * Global cache tag definitions for use in both unstable_cache and revalidateTag.
 */
export const TAGS = {
    meetings: 'meetings',
    meeting: (id: string) => `meeting:${id}`,
    meetingResults: (id: string) => `meeting-results:${id}`,
    meetingWhiskies: (id: string) => `meeting-whiskies:${id}`,
    whisky: (id: string) => `whisky:${id}`,
    members: 'members'
};
