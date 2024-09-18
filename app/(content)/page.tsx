'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

const SettingsPage = () => {
    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent>Welcome to the Gillies Voting System</CardContent>
        </Card>
    );
};

export default SettingsPage;
