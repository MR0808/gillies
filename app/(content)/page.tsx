import MainClient from '@/components/mainPage/MainClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const SettingsPage = () => {
    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🥃 Gillies Voting System
                </p>
            </CardHeader>
            <CardContent>
                Welcome to the Gillies Voting System. Please choose your meeting
                to review or vote for.
                <MainClient />
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
