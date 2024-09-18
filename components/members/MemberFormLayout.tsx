'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MemberSchema } from '@/schemas/members';
import { useCreateMember } from '@/features/members/useCreateMember';
import { useEditMember } from '@/features/members/useEditMember';
import { useGetMember } from '@/features/members/useGetMember';
import MemberForm from './MemberForm';

const MemberFormLayout = ({ edit }: { edit: boolean }) => {
    const params = useParams<{ memberid: string }>();
    const memberid = params.memberid;
    const memberQuery = useGetMember(memberid);
    const isLoading = memberQuery.isLoading;

    const mutationCreate = useCreateMember();
    const mutationEdit = useEditMember(memberid);

    const router = useRouter();

    const [isPending, setIsPending] = useState(false);

    const title = edit ? 'Update Member' : 'Add Member';
    const description = edit ? 'Update existing member' : 'Create a new member';
    const action = edit ? 'Update Member' : 'Create Member';

    const defaultValues = memberQuery.data
        ? {
              firstName: memberQuery.data.firstName || '',
              lastName: memberQuery.data.lastName || '',
              email: memberQuery.data.email || ''
          }
        : {
              firstName: '',
              lastName: '',
              email: ''
          };

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        setIsPending(true);
        edit
            ? mutationEdit.mutate(values, {
                  onSuccess: () => {
                      router.push(`/dashboard/members/`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              })
            : mutationCreate.mutate(values, {
                  onSuccess: () => {
                      router.push(`/dashboard/members/`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <MemberForm
                    action={action}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    isPending={isPending}
                />
            )}
        </>
    );
};

export default MemberFormLayout;
