'use client';

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useGetMeetingWhiskies } from '@/features/voting/useGetMeetingWhiskies';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';

const VotingClient = () => {
    const params = useParams<{ meetingid: string }>();
    const meetingid = params.meetingid;

    const router = useRouter();

    const whiskiesQuery = useGetMeetingWhiskies(meetingid);
    const whiskies = whiskiesQuery.data || [];
    const isLoading = whiskiesQuery.isLoading;

    return (
        <>
            <Separator className="mb-4" />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {whiskies.map((whisky) => {
                        return (
                            <AccordionItem value={whisky.id} key={whisky.id}>
                                <AccordionTrigger className="text-left">
                                    <div>{whisky.name}</div>
                                    {whisky.quaich && (
                                        <Badge variant="success">Quaich</Badge>
                                    )}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col">
                                        <div>{whisky.description}</div>
                                        <div>
                                            <Button
                                                onClick={() =>
                                                    router.push(
                                                        `/vote/add/${whisky.id}`
                                                    )
                                                }
                                            >
                                                Vote
                                            </Button>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
};

export default VotingClient;
