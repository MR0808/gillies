'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { WhiskyCardProps, WhiskyVotingProps } from '@/types/voting';
import { ReviewSchema } from '@/schemas/voting';

type ReviewFormData = z.infer<typeof ReviewSchema>;

const WhiskyCard = ({ whisky }: WhiskyCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const existingReview = whisky.reviews[0];

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ReviewFormData>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            whiskyId: whisky.id,
            rating: existingReview?.rating || 0,
            comment: existingReview?.comment || ''
        }
    });

    const onSubmit = async (data: ReviewFormData) => {
        // setIsLoading(true);
        // setSuccess(false);
        // try {
        //     await submitReview(data);
        //     setSuccess(true);
        //     setTimeout(() => setSuccess(false), 3000);
        // } catch (err) {
        //     console.error(err);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-4">
                    {whisky.image && (
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                            <Image
                                src={whisky.image || '/placeholder.svg'}
                                alt={whisky.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-xl">
                                {whisky.name}
                            </CardTitle>
                            <div className="flex flex-row space-x-2">
                                {whisky.quaich && (
                                    <Badge
                                        variant="default"
                                        className="shrink-0"
                                    >
                                        Quaich
                                    </Badge>
                                )}
                                {whisky.order && (
                                    <Badge
                                        variant="outline"
                                        className="shrink-0"
                                    >
                                        #{whisky.order}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        {whisky.description && (
                            <CardDescription className="mt-2">
                                {whisky.description}
                            </CardDescription>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="hidden" {...register('whiskyId')} />

                    <div className="space-y-2">
                        <Label htmlFor={`rating-${whisky.id}`}>
                            Rating (0-10, one decimal place)
                        </Label>
                        <Input
                            id={`rating-${whisky.id}`}
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            placeholder="8.5"
                            {...register('rating', { valueAsNumber: true })}
                            disabled={isLoading}
                        />
                        {errors.rating && (
                            <p className="text-sm text-destructive">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`comment-${whisky.id}`}>
                            Comments <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id={`comment-${whisky.id}`}
                            placeholder="Share your tasting notes..."
                            rows={3}
                            {...register('comment')}
                            disabled={isLoading}
                        />
                        {errors.comment && (
                            <p className="text-sm text-destructive">
                                {errors.comment.message}
                            </p>
                        )}
                    </div>

                    {success && (
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>
                                Review submitted successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : existingReview ? (
                            'Update Review'
                        ) : (
                            'Submit Review'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const WhiskyVoting = ({ whiskies }: WhiskyVotingProps) => {
    return (
        <div className="grid gap-6 lg:grid-cols-1 w-full md:w-1/2">
            {whiskies.map((whisky) => (
                <WhiskyCard key={whisky.id} whisky={whisky} />
            ))}
        </div>
    );
};

export default WhiskyVoting;
