'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Scoreboard, ReviewsScoreboard } from '@/types';
import { getWhisky } from '@/actions/scoreboard';
import { supabase } from '@/utils/supabase';
import whiskyImg from '@/public/images/whisky.jpg';
import profileImg from '@/public/images/profile.jpg';

const ScoreboardLayout = ({
    whiskyScores,
    whiskyReviews
}: {
    whiskyScores: Scoreboard;
    whiskyReviews: ReviewsScoreboard[];
}) => {
    const whiskyid = whiskyScores.whiskyId;
    const [scores, setScores] = useState(whiskyScores);
    const [reviews, setReviews] = useState(whiskyReviews);

    useEffect(() => {
        const getUpdatedScores = async () => {
            const updatedScores = await getWhisky(whiskyid);
            if (updatedScores.whiskyScores)
                setScores(updatedScores?.whiskyScores);
            if (updatedScores.whiskyReviews)
                setReviews(updatedScores?.whiskyReviews);
        };
        const channel = supabase
            .channel('realtime scores')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Review',
                    filter: `whiskyId=eq.${whiskyid}`
                },
                (payload) => {
                    getUpdatedScores();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <>
            <div className="flex flex-col space-y-6 w-3/5">
                <div className="flex flex-row space-x-3">
                    <Image
                        src={whiskyScores.whiskyImage || whiskyImg}
                        width={250}
                        height={250}
                        alt={whiskyScores.whiskyName}
                    />
                    <h1 className="align-middle text-6xl font-extrabold break-normal">
                        {whiskyScores.whiskyName}
                    </h1>
                </div>
                <div className="text-6xl font-bold">{`Number of votes: ${Math.round(scores.count * 100) / 100}`}</div>
                <div className="text-6xl font-bold">{`Average score: ${Math.round(scores.average * 100) / 100}`}</div>
                <div className="text-6xl font-bold">{`Highest score: ${Math.round(scores.max * 100) / 100}`}</div>
                <div className="text-6xl font-bold">{`Lowest score: ${Math.round(scores.min * 100) / 100}`}</div>
            </div>
            <div className="flex flex-col space-y-6 w-2/5 mr-5">
                {reviews.map((review) => {
                    return (
                        <div
                            key={review.id}
                            className="flex flex-col w-4/5 p-4 bg-slate-200 border-gray-800 shadow-md hover:shodow-lg rounded-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mr-auto">
                                    <div className="inline-flex w-16 h-16">
                                        <Image
                                            src={
                                                review.user.image || profileImg
                                            }
                                            alt={`${review.user.name} ${review.user.lastName}`}
                                            height={70}
                                            width={70}
                                            className="w-16 h-16 object-cover rounded-2xl"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-3 space-y-2">
                                        <div className="font-medium leading-none text-slate-600">
                                            {`${review.user.name} ${review.user.lastName}`}
                                        </div>
                                        <div className="font-medium leading-none text-slate-600">
                                            {review.rating}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 overflow-hidden w-[400px]">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ScoreboardLayout;
