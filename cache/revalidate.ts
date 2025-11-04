'use server';
import { revalidateTag } from 'next/cache';
import { TAGS } from './tags';

// --- MEETINGS ---
export async function revalidateMeetingsList() {
    revalidateTag(TAGS.meetings, 'max');
}
export async function revalidateMeeting(id: string) {
    revalidateTag(TAGS.meeting(id), 'max');
}
export async function revalidateMeetingResults(id: string) {
    revalidateTag(TAGS.meetingResults(id), 'max');
}

// --- MEMBERS ---
export async function revalidateMembers() {
    revalidateTag(TAGS.members, 'max');
}

// --- Whiskies ---
export async function revalidateWhiskies(id: string) {
    revalidateTag(TAGS.meetingWhiskies(id), 'max');
}
export async function revalidateWhisky(id: string) {
    revalidateTag(TAGS.whisky(id), 'max');
}
export async function revalidateMeetingWhisky(
    meetingId: string,
    whiskyId: string
) {
    revalidateTag(TAGS.meetingWhisky(meetingId, whiskyId), 'max');
}

export async function revalidateReviews(id: string) {
    revalidateTag(TAGS.reviews, 'max');
}
