'use server';

import db from '@/lib/db';

export async function getDashboardStats() {
    // Mock: Aggregate statistics from database
    const [
        totalUsers,
        totalMeetings,
        totalWhiskies,
        totalReviews,
        adminCount,
        verifiedUsers,
        openMeetings,
        closedMeetings,
        recentMeetings,
        topWhiskies,
        allMeetings,
        usersByRole,
        allReviews
    ] = await Promise.all([
        db.user.count(),
        db.meeting.count(),
        db.whisky.count(),
        db.review.count(),
        db.user.count({ where: { role: 'ADMIN' } }),
        db.user.count({ where: { emailVerified: { not: false } } }),
        db.meeting.count({ where: { status: 'OPEN' } }),
        db.meeting.count({ where: { status: 'CLOSED' } }),
        db.meeting.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: { _count: { select: { users: true } } }
        }),
        db.whisky.findMany({
            include: {
                reviews: true,
                meeting: { select: { location: true } }
            },
            orderBy: { reviews: { _count: 'desc' } },
            take: 5
        }),
        db.meeting.findMany({
            select: {
                date: true,
                _count: { select: { users: true } }
            },
            orderBy: { date: 'asc' }
        }),
        db.user.groupBy({
            by: ['role'],
            _count: { _all: true }
        }),
        db.review.findMany({
            select: { rating: true }
        })
    ]);

    // Calculate meeting trends by month
    const meetingsByMonth = new Map<
        string,
        { meetings: number; attendees: number }
    >();

    allMeetings.forEach((meeting) => {
        const date = new Date(meeting.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });

        const existing = meetingsByMonth.get(monthKey) || {
            meetings: 0,
            attendees: 0
        };
        meetingsByMonth.set(monthKey, {
            meetings: existing.meetings + 1,
            attendees: existing.attendees + meeting._count.users
        });
    });

    const meetingTrends = Array.from(meetingsByMonth.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, data]) => {
            const [year, month] = key.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return {
                month: date.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                }),
                meetings: data.meetings,
                attendees: data.attendees
            };
        });

    const totalAttendees = allMeetings.reduce(
        (sum, meeting) => sum + meeting._count.users,
        0
    );
    const averageAttendees =
        totalMeetings > 0
            ? Number((totalAttendees / totalMeetings).toFixed(1))
            : 0;
    const averageWhiskiesPerMeeting =
        totalMeetings > 0 ? Math.round(totalWhiskies / totalMeetings) : 0;
    const now = new Date();
    const upcomingMeetings = allMeetings.filter(
        (meeting) => new Date(meeting.date) > now
    ).length;

    const meetingStats = {
        averageAttendees,
        totalAttendees,
        averageWhiskiesPerMeeting,
        upcomingMeetings
    };

    const userRoleDistribution = usersByRole.map((group) => {
        const roleName = group.role === 'ADMIN' ? 'Admins' : 'Users';
        const percentage = Math.round((group._count._all / totalUsers) * 100);
        return {
            role: roleName,
            count: group._count._all,
            percentage
        };
    });

    const votingActivity = [
        {
            range: '9-10',
            count: allReviews.filter((r) => r.rating >= 9 && r.rating <= 10)
                .length
        },
        {
            range: '8-9',
            count: allReviews.filter((r) => r.rating >= 8 && r.rating < 9)
                .length
        },
        {
            range: '7-8',
            count: allReviews.filter((r) => r.rating >= 7 && r.rating < 8)
                .length
        },
        {
            range: '6-7',
            count: allReviews.filter((r) => r.rating >= 6 && r.rating < 7)
                .length
        },
        {
            range: '0-6',
            count: allReviews.filter((r) => r.rating >= 0 && r.rating < 6)
                .length
        }
    ];

    const topWhiskiesData = topWhiskies
        .map((whisky) => {
            const totalRating = whisky.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            );
            const averageRating =
                whisky.reviews.length > 0
                    ? Number((totalRating / whisky.reviews.length).toFixed(1))
                    : 0;
            return {
                name: whisky.name,
                averageRating,
                totalVotes: whisky.reviews.length,
                meeting: whisky.meeting.location
            };
        })
        .sort((a, b) => b.averageRating - a.averageRating);

    // Mock data with realistic statistics
    return {
        overview: {
            totalUsers,
            totalMeetings,
            totalWhiskies,
            totalReviews,
            adminCount,
            verifiedUsers,
            openMeetings,
            closedMeetings
        },
        recentMeetings,
        topWhiskiesData,
        meetingTrends,
        userRoleDistribution,
        votingActivity,
        meetingStats
    };
}
