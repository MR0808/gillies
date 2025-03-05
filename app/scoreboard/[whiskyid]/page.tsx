import { getWhisky } from '@/actions/scoreboard';
import ScoreboardLayout from '@/components/scoreboard/ScoreboardLayout';

const ScoreboardPage = async (props: {
    params: Promise<{ whiskyid: string }>;
}) => {
    const params = await props.params;
    const data = await getWhisky(params.whiskyid);

    if (!data || !data.whiskyScores) return <h1>Whisky not found!</h1>;

    const { whiskyScores, whiskyReviews } = data;

    return (
        <div className="flex flex-row p-10 space-x-10">
            <ScoreboardLayout
                whiskyScores={whiskyScores}
                whiskyReviews={whiskyReviews}
            />
        </div>
    );
};
export default ScoreboardPage;
