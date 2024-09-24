import VoteFormLayout from '@/components/voting/VoteFormLayout';
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
                <VoteFormLayout />
            </CardContent>
        </Card>
    );
};

export default VotePage;
