'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    Users,
    Sparkles
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { WhiskyLive } from '@/types/live';
import { supabase } from '@/utils/supabase';
import { getLiveWhiskyScores } from '@/actions/live';

const LiveScoringDisplay = ({
    whisky: initialWhisky
}: {
    whisky: WhiskyLive;
}) => {
    const [whisky, setWhisky] = useState(initialWhisky);
    const [newReviewId, setNewReviewId] = useState<string | null>(null);

    // Polling for updates (replace with WebSocket/SSE in production)
    useEffect(() => {
        const getUpdatedScores = async () => {
            const updatedScores = await getLiveWhiskyScores(whisky.id);
            if (updatedScores) setWhisky(updatedScores);
        };
        const channel = supabase
            .channel('realtime scores')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Review',
                    filter: `whiskyId=eq.${whisky.id}`
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

    const calculateStats = () => {
        if (whisky.reviews.length === 0) {
            return { avg: 0, min: 0, max: 0, count: 0 };
        }

        const ratings = whisky.reviews.map((r) => r.rating);
        const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        const min = Math.min(...ratings);
        const max = Math.max(...ratings);

        return { avg, min, max, count: ratings.length };
    };

    const stats = calculateStats();
    const latestReview = whisky.reviews[0];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Whisky Info */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full">
                        <div className="flex items-center gap-6 p-6">
                            {/* Smaller image */}
                            <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-slate-800">
                                {whisky.image && (
                                    <img
                                        src={whisky.image || '/placeholder.svg'}
                                        alt={whisky.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {whisky.order && (
                                    <div className="absolute top-2 left-2">
                                        <Badge
                                            variant="secondary"
                                            className="text-lg px-3 py-1 bg-slate-950/80"
                                        >
                                            #{whisky.order}
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Compact info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-bold text-white truncate">
                                        {whisky.name}
                                    </h2>
                                    {whisky.quaich && (
                                        <Badge className="bg-amber-500 text-amber-950 px-3 py-1 gap-2 shrink-0">
                                            <Trophy className="h-4 w-4" />
                                            Quaich
                                        </Badge>
                                    )}
                                </div>
                                {whisky.description && (
                                    <p className="text-slate-400 text-base line-clamp-2">
                                        {whisky.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Right Column - Latest Vote */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {latestReview && (
                        <Card className="bg-linear-to-br from-slate-600 to-slate-800 border-slate-700 backdrop-blur-sm p-6 h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="h-6 w-6 text-slate-200" />
                                <h3 className="text-2xl font-bold text-white">
                                    Latest Vote
                                </h3>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16 border-2 border-slate-300">
                                    <AvatarImage
                                        src={
                                            latestReview.user.image ||
                                            '/images/profile.jpg'
                                        }
                                    />
                                    <AvatarFallback className="text-2xl bg-slate-950 text-slate-200">
                                        {latestReview.user.name[0]}
                                        {latestReview.user.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xl font-semibold text-white">
                                            {latestReview.user.name}{' '}
                                            {latestReview.user.lastName}
                                        </p>
                                        <Badge className="bg-slate-950 text-gray-100 text-2xl px-4 py-1">
                                            {latestReview.rating.toFixed(1)}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-100 text-lg leading-relaxed">
                                        {latestReview.comment}
                                    </p>
                                    <p className="text-slate-300 text-sm mt-2">
                                        {formatDistanceToNow(
                                            new Date(latestReview.createdAt),
                                            { addSuffix: true }
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Average Score */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Average Score - Large Display */}
                    <Card className="bg-linear-to-br from-blue-600 to-blue-800 border-blue-700 backdrop-blur-sm p-8">
                        <div className="text-center">
                            <p className="text-blue-200 text-xl mb-4 font-medium">
                                Current Average
                            </p>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stats.avg}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 20
                                    }}
                                    className="text-9xl font-bold text-white mb-4"
                                >
                                    {stats.avg.toFixed(1)}
                                </motion.div>
                            </AnimatePresence>
                            <p className="text-blue-200 text-2xl">
                                out of 10.0
                            </p>
                        </div>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-emerald-500/20">
                                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-1">
                                Highest
                            </p>
                            <p className="text-4xl font-bold text-white">
                                {stats.max.toFixed(1)}
                            </p>
                        </Card>

                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-red-500/20">
                                    <TrendingDown className="h-6 w-6 text-red-400" />
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-1">
                                Lowest
                            </p>
                            <p className="text-4xl font-bold text-white">
                                {stats.min.toFixed(1)}
                            </p>
                        </Card>

                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Users className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mb-1">
                                Total Votes
                            </p>
                            <p className="text-4xl font-bold text-white">
                                {stats.count}
                            </p>
                        </Card>
                    </div>
                </motion.div>

                {/* Right Column - Recent Votes Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            Recent Votes
                        </h3>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            <AnimatePresence>
                                {whisky.reviews.slice(1, 6).map((review) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className={`flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 ${
                                            newReviewId === review.id
                                                ? 'ring-2 ring-amber-500'
                                                : ''
                                        }`}
                                    >
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={
                                                    review.user.image ||
                                                    '/images/profile.jpg'
                                                }
                                            />
                                            <AvatarFallback className="bg-slate-700 text-slate-200">
                                                {review.user.name[0]}
                                                {review.user.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-white truncate">
                                                    {review.user.name}{' '}
                                                    {review.user.lastName}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className="text-lg px-3 py-1 text-white bg-slate-700 border-slate-600"
                                                >
                                                    {review.rating.toFixed(1)}
                                                </Badge>
                                            </div>
                                            <p className="text-slate-100 text-sm line-clamp-2">
                                                {review.comment}
                                            </p>
                                            <p className="text-slate-100 text-xs mt-1">
                                                {formatDistanceToNow(
                                                    new Date(review.createdAt),
                                                    { addSuffix: true }
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Score Distribution Bar */}
            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Score Distribution
                    </h3>
                    <div className="flex items-end gap-2 h-32">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
                            const count = whisky.reviews.filter(
                                (r) => Math.floor(r.rating) === score
                            ).length;
                            const maxCount = Math.max(
                                ...Array.from(
                                    { length: 11 },
                                    (_, i) =>
                                        whisky.reviews.filter(
                                            (r) => Math.floor(r.rating) === i
                                        ).length
                                )
                            );
                            const height =
                                maxCount > 0 ? (count / maxCount) * 100 : 0;

                            return (
                                <div
                                    key={score}
                                    className="flex-1 flex flex-col items-center gap-2"
                                >
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            delay: 0.6 + score * 0.05,
                                            type: 'spring'
                                        }}
                                        className="w-full bg-linear-to-t from-blue-600 to-blue-400 rounded-t-lg min-h-1"
                                    />
                                    <span className="text-slate-400 text-sm font-medium">
                                        {score}
                                    </span>
                                    {count > 0 && (
                                        <span className="text-slate-500 text-xs">
                                            ({count})
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </motion.div> */}
        </div>
    );
};

export default LiveScoringDisplay;
