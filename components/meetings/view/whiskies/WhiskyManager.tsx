'use client';

import { useState } from 'react';
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
import { Whisky, WhiskyManagerProps } from '@/types/meeting';

const WhiskyManager = ({ meeting }: WhiskyManagerProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingWhisky, setEditingWhisky] = useState<Whisky | null>(null);

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
                    {meeting.whiskies.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No whiskies added yet. Click "Add Whisky" to get
                            started.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                            {meeting.whiskies.map((whisky) => (
                                <WhiskyCard
                                    key={whisky.id}
                                    whisky={whisky}
                                    onEdit={handleEdit}
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
                currentQuaichId={meeting.quaich}
                existingOrders={meeting.whiskies.map((w) => w.order)}
            />
        </div>
    );
};

export default WhiskyManager;
