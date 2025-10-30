// lib/cache.ts
import { unstable_cache, revalidateTag } from 'next/cache';

type CacheOptions = {
    /** Revalidation time in seconds (default: 600 = 10 minutes) */
    revalidate?: number;
    /** Tags for invalidation (default: []) */
    tags?: string[];
};

/**
 * Cached function creator.
 * Wrap any async function in a stable, tag-aware cache layer.
 *
 * @param key - Unique cache key or array of keys
 * @param fn - The async function to cache
 * @param options - Revalidation interval & tags
 */
export function createCached<T extends (...args: any[]) => Promise<any>>(
    key: string | string[],
    fn: T,
    options: CacheOptions = {}
) {
    const { revalidate = 600, tags = [] } = options;

    const cached = unstable_cache(fn, Array.isArray(key) ? key : [key], {
        revalidate,
        tags
    });

    return cached as T;
}

/**
 * Manually invalidates cached data associated with one or more tags.
 *
 * @param tags - Array of tag names to revalidate
 */
export function invalidateCache(tags: string | string[]) {
    const tagArray = Array.isArray(tags) ? tags : [tags];

    for (const tag of tagArray) {
        try {
            // ✅ Works for Next.js 15 (requires 2 arguments)
            // Fallback for older versions still using single-arg
            revalidateTag(tag, 'page');
        } catch (err) {
            console.error(`Failed to revalidate tag "${tag}":`, err);
        }
    }
}
