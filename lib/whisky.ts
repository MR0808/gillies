type AbvValue =
    | number
    | string
    | null
    | undefined
    | { toNumber: () => number };

export const whiskyCoreSelect = {
    id: true,
    name: true,
    description: true,
    image: true,
    order: true,
    quaich: true,
    age: true,
    nas: true,
    abv: true
} as const;

export function serializeWhiskyAbv(abv: AbvValue): number | null {
    if (abv == null) return null;

    const n =
        typeof abv === 'object' && 'toNumber' in abv
            ? abv.toNumber()
            : Number(abv);

    if (!Number.isFinite(n)) return null;
    return Math.round(n * 10) / 10;
}

export function serializeWhiskyRow<T extends { abv?: unknown }>(row: T) {
    return {
        ...row,
        abv: serializeWhiskyAbv(row.abv as AbvValue)
    };
}

export function hasWhiskySpecs(
    age?: number | null,
    abv?: number | null,
    nas?: boolean
) {
    return nas === true || age != null || abv != null;
}
