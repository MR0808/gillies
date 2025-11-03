'use client';

import { useTransition, useState } from 'react';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Dispatch, SetStateAction } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    CheckCircle2,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Trophy,
    MoreHorizontal
} from 'lucide-react';
import { ReviewSchema, ReviewFormInput } from '@/schemas/voting';
import { cn } from '@/lib/utils';
import { Whisky } from '@/types/voting';
import { createVote } from '@/actions/voting';

function WhiskyVotingCard({
    whisky,
    onNext,
    onPrev,
    onJumpTo,
    isFirst,
    isLast,
    currentIndex,
    total,
    success,
    setSuccess
}: {
    whisky: Whisky;
    onNext: () => void;
    onPrev: () => void;
    onJumpTo: (index: number) => void;
    isFirst: boolean;
    isLast: boolean;
    currentIndex: number;
    total: number;
    success: boolean;
    setSuccess: Dispatch<SetStateAction<boolean>>;
}) {
    const [showAllPages, setShowAllPages] = useState(false);
    const [isPending, startTransition] = useTransition();

    const existingReview = whisky.reviews[0];

    const form = useForm<ReviewFormInput>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            whiskyId: whisky.id,
            rating: existingReview?.rating.toString() || '0.0',
            comment: existingReview?.comment || ''
        }
    });

    const onSubmit = async (data: ReviewFormInput) => {
        startTransition(async () => {
            const parsed = {
                ...data,
                rating: parseFloat(data.rating) // convert here ✅
            };

            setSuccess(false);
            try {
                const data = await createVote(parsed);
                if (data.success) {
                    setSuccess(true);
                    form.reset();
                    toast.success('Review submitted successfully!');
                }
                if (data.error) {
                    throw new Error(data.error);
                }
            } catch (err) {
                toast.error(`Something went wrong - ${err}`);
            }
        });
    };

    const onError: SubmitErrorHandler<ReviewFormInput> = (errors) => {
        const firstError = Object.values(errors)[0] as { message?: string };
        toast.error('Invalid rating', {
            description: firstError?.message ?? 'Please check your inputs.'
        });
    };

    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];

        if (total <= 10 || showAllPages) {
            for (let i = 0; i < total; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 0; i < 9; i++) {
                pages.push(i);
            }
            pages.push('ellipsis');
        }

        return pages;
    };

    return (
        <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-medium text-muted-foreground">
                        Whisky {currentIndex + 1} of {total}
                    </span>
                    {whisky.quaich && (
                        <Badge variant="secondary" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            Quaich
                        </Badge>
                    )}
                </div>
                <div className="hidden md:flex gap-1 shrink-0">
                    {Array.from({ length: total }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                'h-1.5 w-8 rounded-full transition-colors',
                                i === currentIndex
                                    ? 'bg-primary'
                                    : i < currentIndex
                                      ? 'bg-primary/50'
                                      : 'bg-muted'
                            )}
                        />
                    ))}
                </div>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="whiskyId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={onPrev}
                            disabled={isFirst}
                            className="flex-1 h-12 bg-transparent cursor-pointer"
                        >
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            Previous
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={onNext}
                            disabled={isLast}
                            className="flex-1 h-12 bg-transparent cursor-pointer"
                        >
                            Next
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
                        {whisky.image && (
                            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                                <Image
                                    src={whisky.image || '/placeholder.svg'}
                                    alt={whisky.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 672px"
                                    priority
                                />
                            </div>
                        )}

                        <div className="p-6 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        {whisky.name}
                                    </h2>
                                    {whisky.description && (
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            {whisky.description}
                                        </p>
                                    )}
                                </div>
                                {whisky.order && (
                                    <Badge
                                        variant="outline"
                                        className="shrink-0 text-base px-3 py-1"
                                    >
                                        #{whisky.order}
                                    </Badge>
                                )}
                            </div>

                            <div className="space-y-3">
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Your Rating (0-10){' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="e.g., 7.5"
                                                    className="text-2xl font-bold text-center h-16"
                                                    disabled={isPending}
                                                    {...field}
                                                    onChange={(e) => {
                                                        const val =
                                                            e.target.value;
                                                        // Allow up to 2 digits before decimal, one after, or empty
                                                        if (
                                                            /^\d{0,2}(\.\d?)?$/.test(
                                                                val
                                                            ) ||
                                                            val === ''
                                                        ) {
                                                            field.onChange(val);
                                                        }
                                                    }}
                                                    onBlur={(e) => {
                                                        let num = parseFloat(
                                                            e.target.value
                                                        );
                                                        if (isNaN(num)) num = 0;
                                                        // Clamp between 0 and 10
                                                        num = Math.max(
                                                            0,
                                                            Math.min(10, num)
                                                        );
                                                        // Auto-format to one decimal place
                                                        field.onChange(
                                                            num.toFixed(1)
                                                        );
                                                    }}
                                                    onFocus={(e) =>
                                                        e.target.select()
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter a number between 0 and 10 (one decimal
                                    place)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Tasting Notes{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the aroma, taste, finish..."
                                                    rows={4}
                                                    className="resize-none text-base"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {success && (
                                <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950 p-4 text-green-900 dark:text-green-100">
                                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                                    <span className="text-sm font-medium">
                                        Review submitted successfully!
                                    </span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-base font-semibold cursor-pointer"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : existingReview ? (
                                    'Update Review'
                                ) : (
                                    'Submit Review'
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={onPrev}
                                disabled={isFirst}
                                className="flex-1 h-12 bg-transparent cursor-pointer"
                            >
                                <ChevronLeft className="mr-2 h-5 w-5" />
                                Previous
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={onNext}
                                disabled={isLast}
                                className="flex-1 h-12 bg-transparent cursor-pointer"
                            >
                                Next
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-5 gap-2">
                                {getPageNumbers()
                                    .slice(0, 5)
                                    .map((page, idx) =>
                                        page === 'ellipsis' ? (
                                            <Button
                                                key={`ellipsis-${idx}`}
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setShowAllPages(true)
                                                }
                                                className="h-10 cursor-pointer"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                key={page}
                                                type="button"
                                                variant={
                                                    currentIndex === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                onClick={() => onJumpTo(page)}
                                                className="h-10 font-semibold cursor-pointer"
                                            >
                                                {page + 1}
                                            </Button>
                                        )
                                    )}
                            </div>
                            {getPageNumbers().length > 5 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {getPageNumbers()
                                        .slice(5, 10)
                                        .map((page, idx) =>
                                            page === 'ellipsis' ? (
                                                <Button
                                                    key={`ellipsis-${idx}`}
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setShowAllPages(true)
                                                    }
                                                    className="h-10 cursor-pointer"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    key={page}
                                                    type="button"
                                                    variant={
                                                        currentIndex === page
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        onJumpTo(page)
                                                    }
                                                    className="h-10 font-semibold cursor-pointer"
                                                >
                                                    {page + 1}
                                                </Button>
                                            )
                                        )}
                                </div>
                            )}
                            {showAllPages && getPageNumbers().length > 10 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {getPageNumbers()
                                        .slice(10)
                                        .map((page) => (
                                            <Button
                                                key={page}
                                                type="button"
                                                variant={
                                                    currentIndex === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    onJumpTo(page as number)
                                                }
                                                className="h-10 font-semibold cursor-pointer"
                                            >
                                                {(page as number) + 1}
                                            </Button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

const WhiskyVoting = ({ whiskies }: { whiskies: Whisky[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleNext = () => {
        setSuccess(false);
        if (currentIndex < whiskies.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        setSuccess(false);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleJumpTo = (index: number) => {
        setSuccess(false);
        setCurrentIndex(index);
    };

    if (whiskies.length === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">
                    No whiskies available for this meeting.
                </p>
            </div>
        );
    }

    return (
        <div className="py-4">
            <WhiskyVotingCard
                whisky={whiskies[currentIndex]}
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                isFirst={currentIndex === 0}
                isLast={currentIndex === whiskies.length - 1}
                currentIndex={currentIndex}
                total={whiskies.length}
                success={success}
                setSuccess={setSuccess}
            />
        </div>
    );
};

export default WhiskyVoting;
