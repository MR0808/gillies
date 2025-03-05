'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { User } from '@prisma/client';

import { MemberSchema } from '@/schemas/members';
import MemberForm from './MemberForm';
import { createMember, updateMember } from '@/actions/members';

const MemberFormLayout = ({ member }: { member?: User }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const action = member ? 'Update Member' : 'Create Member';

    const defaultValues = member
        ? {
              firstName: member.firstName || '',
              lastName: member.lastName || '',
              email: member.email || ''
          }
        : {
              firstName: '',
              lastName: '',
              email: ''
          };

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        startTransition(() => {
            if (member) {
                updateMember(values, member?.id).then((data) => {
                    if (data?.data) {
                        router.push(`/dashboard/members/`);
                    }
                });
            } else {
                createMember(values).then((data) => {
                    if (data?.data) {
                        router.push(`/dashboard/members/`);
                    }
                });
            }
        });
    };

    return (
        <>
            <MemberForm
                action={action}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                isPending={isPending}
            />
        </>
    );
};

export default MemberFormLayout;
