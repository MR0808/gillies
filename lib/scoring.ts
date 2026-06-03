/**
 * Ice skating style score: drop the single highest and lowest rating, then average the rest.
 * With fewer than 3 votes there is nothing to trim, so this falls back to the plain average.
 */
export function calculateIceSkatingScore(ratings: number[]): number {
    if (ratings.length === 0) return 0;
    if (ratings.length <= 2) {
        return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    }

    const sorted = [...ratings].sort((a, b) => a - b);
    const trimmed = sorted.slice(1, -1);
    return trimmed.reduce((sum, r) => sum + r, 0) / trimmed.length;
}

export type WhiskyScoreStats = {
    avg: number;
    min: number;
    max: number;
    stdDev: number;
    count: number;
    iceSkating: number;
};

export function calculateWhiskyScoreStats(ratings: number[]): WhiskyScoreStats {
    if (ratings.length === 0) {
        return { avg: 0, min: 0, max: 0, stdDev: 0, count: 0, iceSkating: 0 };
    }

    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    const min = Math.min(...ratings);
    const max = Math.max(...ratings);
    const variance =
        ratings.reduce((sum, rating) => sum + (rating - avg) ** 2, 0) /
        ratings.length;
    const stdDev = Math.sqrt(variance);
    const iceSkating = calculateIceSkatingScore(ratings);

    return { avg, min, max, stdDev, count: ratings.length, iceSkating };
}
