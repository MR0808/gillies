'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import { Edit, Trash2, Award, Radio, ChartArea } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { WhiskyCardProps } from '@/types/meeting';
import { deleteWhisky } from '@/actions/whiskies';
import Link from 'next/link';

const WhiskyCard = ({ whisky, onEdit, meetingId }: WhiskyCardProps) => {
    const handleDelete = async () => {
        try {
            const data = await deleteWhisky(whisky.id);
            if (data.success) {
                toast.success('Whisky deleted successfully');
            }
            if (data.error) {
                toast.error('Failed to delete whisky');
            }
        } catch (error) {
            toast.error('Failed to delete whisky');
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative aspect-square">
                    <Image
                        src={
                            whisky.image ||
                            '/placeholder.svg?height=300&width=300&query=whisky+bottle'
                        }
                        alt={whisky.name}
                        fill
                        className="object-cover"
                    />
                    {whisky.quaich && (
                        <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                            <Award className="mr-1 h-3 w-3" />
                            Quaich
                        </Badge>
                    )}
                    <Badge
                        className="absolute top-2 left-2"
                        variant="secondary"
                    >
                        #{whisky.order}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{whisky.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {whisky.description || 'No description'}
                </p>
            </CardContent>
            <CardFooter className="px-4 pt-0 gap-2">
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-row space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent cursor-pointer"
                            onClick={() => onEdit(whisky)}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 bg-transparent  cursor-pointer"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete Whisky
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete "
                                        {whisky.name}"? This action cannot be
                                        undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <Link href={`/live/${whisky.id}`} target="_blank">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer"
                        >
                            <Radio className="mr-2 h-4 w-4" />
                            Live scores
                        </Button>
                    </Link>
                    <Link
                        href={`/dashboard/meetings/${meetingId}/whiskies/${whisky.id}`}
                    >
                        <Button
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer"
                        >
                            <ChartArea className="mr-2 h-4 w-4" />
                            Results
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default WhiskyCard;
