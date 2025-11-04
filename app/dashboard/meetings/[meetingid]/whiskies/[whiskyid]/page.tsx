import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getWhiskyDetails } from '@/actions/whiskies';
import { authCheckAdmin } from '@/lib/authCheck';
import WhiskyDetailHeader from '@/components/whisky/WhiskyDetailHeader';
import WhiskyStatistics from '@/components/whisky/WhiskyStatistics';
import WhiskyCharts from '@/components/whisky/WhiskyCharts';
import WhiskyVotesTable from '@/components/whisky/WhiskyVotesTable';

const WhiskyDetailPage = async (props: {
    params: Promise<{ meetingid: string; whiskyid: string }>;
}) => {
    const params = await props.params;
    const userSession = await authCheckAdmin(
        `/dashboard/meetings/${params.meetingid}/whiskies/${params.whiskyid}`
    );
    const whiskyReturn = await getWhiskyDetails(
        params.meetingid,
        params.whiskyid
    );

    if (!whiskyReturn.data) return null;

    const whisky = whiskyReturn.data;

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link
                        href={`/dashboard/meetings/${params.meetingid}/results`}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Whisky Details</h1>
                    <p className="text-muted-foreground">
                        {whisky.meeting.location} •{' '}
                        {new Date(whisky.meeting.date).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <WhiskyDetailHeader whisky={whisky} />
            <WhiskyStatistics stats={whisky.stats} />
            <WhiskyCharts reviews={whisky.reviews} />
            <WhiskyVotesTable
                reviews={whisky.reviews}
                whiskyName={whisky.name}
            />
        </div>
    );
};

export default WhiskyDetailPage;
