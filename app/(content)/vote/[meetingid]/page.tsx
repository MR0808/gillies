import VotingClient from '@/components/voting/VotingClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const VotePage = () => {
    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🥃 Gillies Voting System
                </p>
            </CardHeader>
            <CardContent>
                <VotingClient />
            </CardContent>
        </Card>
    );
};

export default VotePage;
