'use client';

import * as z from 'zod';
import { useState, useRef, useEffect, useTransition } from 'react';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Camera } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import profile from '@/public/images/profile.jpg';
import { Input } from '@/components/ui/input';
import { ProfileButton } from '@/components/form/Buttons';
import { ProfilePictureSchema } from '@/schemas/settings';
import { updateProfilePicture } from '@/actions/settings';

const ProfilePictureForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const { data: newSession, update } = useSession();
    const [newImage, setNewImage] = useState(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | undefined>(user?.image);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setNewImage(true);
        }
    };

    const removeImage = () => {
        setImage(user?.image);
        setNewImage(false);
        if (imageRef.current) imageRef.current.value = '';
    };

    const form = useForm<z.infer<typeof ProfilePictureSchema>>({
        resolver: zodResolver(ProfilePictureSchema)
    });

    const { ref, ...fileRef } = form.register('image');

    const handleClick = () => {
        imageRef.current?.click();
    };

    const onSubmit = (values: z.infer<typeof ProfilePictureSchema>) => {
        startTransition(() => {
            const formData = new FormData();
            formData.append('image', values.image[0]);

            updateProfilePicture(formData)
                .then((data) => {
                    if (!data?.result) {
                        toast.error(data.message);
                    }

                    if (data?.result) {
                        update();
                        form.reset(values);
                        toast.success('Profile picture successfully updated');
                    }
                })
                .catch(() => toast.error('Something went wrong!'));
        });
    };

    return (
        <div className="px-4 w-full flex justify-center items-center">
            <Card className={cn('sm:w-[400px] w-full mb-6')}>
                <CardHeader>
                    <CardTitle>
                        <div className="flex flex-row justify-center">
                            <div className="text-xl font-semibold items-center">
                                Profile Picture
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className={cn('p-0')}>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full p-1"
                        >
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-[120px] h-[120px] max-h-[120px] max-w-[120px] border-2 border-solid border-white rounded-full shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] relative">
                                    <Image
                                        src={image || profile}
                                        alt={`${user?.firstName} ${user?.lastName}}`}
                                        fill
                                        className={cn('w-full rounded-full')}
                                    />
                                    <>
                                        <div
                                            className="flex w-8 h-8 leading-7 text-xs border border-[#585C5480] border-solid bg-white absolute text-black rounded-full items-center justify-center right-0 bottom-0 cursor-pointer hover:bg-primary"
                                            onClick={handleClick}
                                        >
                                            <Camera className="w-4 h-4" />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="file"
                                                                placeholder="shadcn"
                                                                {...fileRef}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    fileRef.onChange(
                                                                        event
                                                                    );
                                                                    onImageChange(
                                                                        event
                                                                    );
                                                                }}
                                                                className="hidden"
                                                                accept="image/*"
                                                                ref={(e) => {
                                                                    ref(e);
                                                                    imageRef.current =
                                                                        e; // you can still assign to ref
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </>
                                </div>
                                <div className="mt-5 flex flex-col justify-center items-center">
                                    {newImage && (
                                        <div
                                            className="cursor-pointer hover:underline pb-2 text-sm text-gray-700"
                                            onClick={removeImage}
                                        >
                                            Remove
                                        </div>
                                    )}
                                    <div className="pb-2">
                                        <ProfileButton
                                            text="Save"
                                            newImage={newImage}
                                            isPending={isPending}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
export default ProfilePictureForm;
