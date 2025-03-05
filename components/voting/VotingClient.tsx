'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Whiskies } from '@/types';
import whiskyImg from '@/public/images/whisky.jpg';

const VotingClient = ({ whiskies }: { whiskies: Whiskies[] }) => {
    const router = useRouter();

    return (
        <Accordion type="single" collapsible className="w-full">
            {whiskies.map((whisky) => {
                return (
                    <AccordionItem value={whisky.id} key={whisky.id}>
                        <AccordionTrigger className="text-left">
                            <div>
                                {whisky.reviews.length > 0 && (
                                    <Badge variant="destructive">
                                        {whisky.reviews[0].rating}
                                    </Badge>
                                )}{' '}
                                {whisky.name}
                            </div>
                            {whisky.quaich && (
                                <Badge variant="success">Quaich</Badge>
                            )}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col">
                                <Image
                                    src={whisky.image || whiskyImg}
                                    alt={whisky.name}
                                    width={100}
                                    height={100}
                                />
                                <div className="whitespace-pre-wrap">
                                    {whisky.description}
                                </div>
                                <div className="mt-3">
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
    );
};

export default VotingClient;
