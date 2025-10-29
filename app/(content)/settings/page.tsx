import PortalLayout from '@/components/portalLayout/PortalLayout';
import SettingsTabs from '@/components/settings/SettingsTabs';
import { authCheck } from '@/lib/authCheck';

const SettingsPage = async () => {
    const userSession = await authCheck('/settings');

    return (
        <PortalLayout userSession={userSession}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your account settings and preferences
                    </p>
                </div>

                <SettingsTabs userSession={userSession} />
            </div>
        </PortalLayout>
    );
};

export default SettingsPage;
