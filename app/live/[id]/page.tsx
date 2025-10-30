import { getLiveWhiskyScores } from '@/actions/live';
import LiveScoringDisplay from '@/components/live/LiveScoringDisplay';

const LiveScoringPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const whisky = await getLiveWhiskyScores(params.id);

    if (!whisky) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            <LiveScoringDisplay whisky={whisky} />
        </div>
    );
};

export default LiveScoringPage;
