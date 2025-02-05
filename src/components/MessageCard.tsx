'use client'

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardTitle } from '@/components/ui/card';
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
        window.open(shareUrl, '_blank');
    };

    return (
        <>
            <Card className="border border-gray-600 bg-gray-800 hover:bg-gray-750 text-neutral-300 rounded-xl shadow-lg transition-all duration-300 p-5">
                <div className="flex justify-between items-start">
                    <div className="w-full">
                        <CardTitle className="text-lg font-semibold text-gray-200">
                            {message.content}
                        </CardTitle>
                        <div className="flex gap-4 mt-2 text-gray-300 text-sm">
                            <span className="px-3 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full inline-block">{message.category}</span>
                            <span className='px-3 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full inline-block'>Rating: {message.rating}</span>
                        </div>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="p-2 rounded-lg transition-colors hover:bg-gray-700">
                                <Trash2 className="w-5 h-5 text-neutral-400 hover:text-red-500" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-800 border-none text-white rounded-lg shadow-lg">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg font-bold">Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm text-gray-400">
                                    This action cannot be undone. This will permanently delete this message.
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

                <div className="flex items-center pt-5 text-sm justify-between gap-4 text-gray-500">
                    <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                    </p>
                    <BsTwitterX className="w-4 h-4 cursor-pointer text-gray-400 hover:text-white transition-all" onClick={() => handleShare('twitter')} />
                </div>
            </Card>
        </>
    );
}