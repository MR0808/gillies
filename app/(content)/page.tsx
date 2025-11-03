import { getUserMeetings } from '@/actions/voting';
import { authCheck } from '@/lib/authCheck';
import PortalLayout from '@/components/portalLayout/PortalLayout';
import { MeetingSelector } from '@/components/mainpage/MeetingSelector';

const SettingsPage = async () => {
    const userSession = await authCheck('/');

    const meetings = await getUserMeetings(userSession.user.id);

    return (
        <PortalLayout userSession={userSession}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {userSession.user.name}!
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Select a meeting to vote on whiskies
                    </p>
                </div>

                <MeetingSelector meetings={meetings.data} />
            </div>
        </PortalLayout>
    );
};

export default SettingsPage;
