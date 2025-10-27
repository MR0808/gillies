'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import AddMemberMeetingModal from '@/components/modal/AddMemberMeetingModal';
import { MeetingMembers } from '@/types';

const MembersClient = ({
    members,
    meetingid
}: {
    members: MeetingMembers[];
    meetingid: string;
}) => {
    const [openEdit, setOpenEdit] = useState(false);

    const membersUpload = members.map((member) => {
        return member.id;
    });

    const [defaultValues, setDefaultValues] = useState({
        members: membersUpload
    });

    return (
        <>
            <AddMemberMeetingModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                defaultValues={defaultValues}
                meetingid={meetingid}
                setDefaultValues={setDefaultValues}
            />
            <div className="flex sm:flex-row flex-col items-start justify-between mb-6">
                <Heading title={`Members (${members.length})`} description="" />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => {
                            setOpenEdit(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Edit Members
                    </Button>
                </div>
            </div>
            <Separator className="mb-6" />
            <div className="grid grid-rows-10 grid-flow-col gap-4">
                {members.map((member) => {
                    return (
                        <div key={member.id}>
                            {member.firstName} {member.lastName}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MembersClient;
