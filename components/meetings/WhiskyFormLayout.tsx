'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { WhiskySchema, WhiskySchemaForm } from '@/schemas/whisky';
import { useGetWhisky } from '@/features/whiskies/useGetWhisky';
import WhiskyForm from './WhiskyForm';

const WhiskyFormLayout = ({ edit }: { edit: boolean }) => {
    const params = useParams<{ whiskyid: string }>();
    const whiskyid = params.whiskyid;
    const whiskyQuery = useGetWhisky(whiskyid);
    const isLoading = whiskyQuery.isLoading;

    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const title = edit ? 'Update Meeting' : 'Add Meeting';
    const description = edit
        ? 'Update existing meeting'
        : 'Create a new meeting';
    const action = edit ? 'Update meeting' : 'Create meeting';

    const defaultValues = whiskyQuery.data
        ? {
              name: whiskyQuery.data.name || '',
              description: whiskyQuery.data.description || undefined,
              image: undefined,
              quaich: whiskyQuery.data.quaich || false
          }
        : {
              name: '',
              description: '',
              image: undefined,
              quaich: false
          };

    const onSubmit = (values: z.infer<typeof WhiskySchemaForm>) => {
        setIsPending(true);
        // edit
        //     ? mutationEdit.mutate(values, {
        //           onSuccess: () => {
        //               setIsPending(false);
        //           },
        //           onError: () => {
        //               setIsPending(false);
        //           }
        //       })
        //     : mutationCreate.mutate(values, {
        //           onSuccess: (data) => {
        //               router.push(`/dashboard/meetings/${data.data.id}`);
        //           },
        //           onError: () => {
        //               setIsPending(false);
        //           }
        //       });
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
                <>
                    <WhiskyForm
                        action={action}
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        isPending={isPending}
                    />
                </>
            )}
        </>
    );
};

export default WhiskyFormLayout;
