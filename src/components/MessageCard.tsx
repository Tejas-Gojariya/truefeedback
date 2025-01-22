'use client'

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '../types/ApiResponse';
import { Calendar } from 'lucide-react';
import { BsTwitterX } from "react-icons/bs";


type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    const { toast } = useToast();

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(
                `/api/delete-message/${message._id}`
            );
            toast({
                title: response.data.message,
            });
            onMessageDelete(message._id);

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description:
                    axiosError.response?.data.message ?? 'Failed to delete message',
                variant: 'destructive',
            });
        }
    };

    const handleShare = (platform: 'twitter') => {
        const content = encodeURIComponent(`${message.content}\n#TrueFeedback #Review`);
        let shareUrl = '';

        if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${content}`;
        }
        //  else if (platform === 'linkedin') {
        //     shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${content}`;
        // }
        window.open(shareUrl, '_blank');
    };

    return (
        <Card className="hover:border-none border-none bg-gray-700 hover:bg-slate-700 text-neutral-300 rounded-lg shadow-md">
            <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">{message.content}</CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-2 rounded-lg  transition-colors hover:bg-gray-700"
                            >
                                <Trash2 className="w-5 h-5 text-neutral-400 hover:text-red-500" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-800 border-none text-white rounded-lg shadow-lg">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-bold">
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm text-gray-400">
                                    This action cannot be undone. This will permanently delete this
                                    message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex justify-end gap-2">
                                <AlertDialogCancel className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-md"
                                    onClick={handleDeleteConfirm}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                {/* <div className="mt-5 pt-4 flex justify-between items-center text-sm text-gray-400">
                    <p className="flex items-center gap-1">
                        <span className="font-semibold">Rating:</span> {message.rating}
                    </p>
                    <div className="flex justify-between items-center pl-5">
                        <p className="flex items-center gap-2 pr-5">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                        </p>
                        <p className='hover:text-white'><Share2 /></p>
                    </div>
                </div> */}
                <div className="mt-5 pt-4 flex justify-between items-center text-sm text-gray-400">
                    <p className="flex items-center gap-1">
                        <span className="font-semibold">Rating:</span> {message.rating}
                    </p>
                    <div className="flex justify-between items-center pl-5 relative">
                        <p className="flex items-center gap-2 pr-5">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                        </p>
                        <p
                            className="hover:text-white cursor-pointer"                        >
                            <BsTwitterX className='w-5 h-5 cursor-pointer' onClick={() => handleShare('twitter')} />
                        </p>
                        {/* {showShareOptions && (
                            <div className="absolute top-full mt-2 right-0 flex gap-2 bg-gray-800 p-2 rounded-md shadow-lg">
                                <Twitter
                                    className="w-5 h-5 text-blue-400 hover:text-blue-500 cursor-pointer"
                                    onClick={() => handleShare('twitter')}
                                />
                                <Linkedin
                                    className="w-5 h-5 text-blue-700 hover:text-blue-800 cursor-pointer"
                                    onClick={() => handleShare('linkedin')}
                                />
                            </div>
                        )} */}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-1">
            </CardContent>
        </Card>
    );
}