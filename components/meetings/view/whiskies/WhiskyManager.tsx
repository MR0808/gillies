'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import WhiskyCard from '@/components/meetings/view/whiskies/WhiskyCard';
import WhiskyDialog from '@/components/meetings/view/whiskies/WhiskyDialog';
import { getMeetingWhiskies } from '@/actions/whiskies';
import { Whisky, WhiskyManagerProps } from '@/types/meeting';

const WhiskyManager = ({ meeting }: WhiskyManagerProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingWhisky, setEditingWhisky] = useState<Whisky | null>(null);
    const [whiskies, setWhiskies] = useState(meeting.whiskies);

    // Only reset when viewing a different meeting — not on every parent re-render
    // (router.refresh() can briefly serve stale cached whiskies and wipe local adds).
    useEffect(() => {
        setWhiskies(meeting.whiskies);
    }, [meeting.id]);

    const refreshWhiskies = async () => {
        const result = await getMeetingWhiskies(meeting.id);
        if (result.data) {
            setWhiskies(result.data);
        }
    };

    const handleEdit = (whisky: Whisky) => {
        setEditingWhisky(whisky);
        setDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingWhisky(null);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setEditingWhisky(null);
    };

    const handleWhiskySaved = async () => {
        await refreshWhiskies();
    };

    const handleWhiskyDeleted = async () => {
        await refreshWhiskies();
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Whiskies</CardTitle>
                            <CardDescription>
                                Manage the whiskies for this meeting
                            </CardDescription>
                        </div>
                        <Button onClick={handleAdd}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Whisky
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {whiskies.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No whiskies added yet. Click "Add Whisky" to get
                            started.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                            {whiskies.map((whisky) => (
                                <WhiskyCard
                                    key={whisky.id}
                                    whisky={whisky}
                                    onEdit={handleEdit}
                                    onDeleted={handleWhiskyDeleted}
                                    meetingId={meeting.id}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <WhiskyDialog
                open={dialogOpen}
                onClose={handleClose}
                whisky={editingWhisky}
                meetingId={meeting.id}
                currentQuaichId={
                    whiskies.find((w) => w.quaich)?.id ?? meeting.quaich
                }
                existingOrders={whiskies.map((w) => w.order)}
                onSaved={handleWhiskySaved}
            />
        </div>
    );
};

export default WhiskyManager;
