'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
interface MessageCountDisplayProps {
    count: number;
}

const MessageCountDisplay = ({ count }: MessageCountDisplayProps) => (
    <>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center p-6">
            <Card className="w-full border-none max-w-sm bg-gray-700 text-neutral-300 rounded-lg shadow-md">
                <CardHeader className="p-6 text-center">
                    <CardTitle className="text-2xl font-semibold">{count}</CardTitle>
                    <CardDescription className="text-gray-400 mt-2">Messages in your account</CardDescription>
                </CardHeader>
                <CardContent />
            </Card>

            <Card className="w-full border-none max-w-sm bg-gray-700 text-neutral-300 rounded-lg shadow-md">
                <CardHeader className="p-6 text-center">
                    <CardTitle className="text-2xl font-semibold">Download Your Data</CardTitle>
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto">
                        <Button
                            className="w-full sm:w-auto px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-900 rounded-lg font-medium transition-all"
                            onClick={() => genratePDF(messages)}
                        >
                            Export to PDF
                        </Button>
                        <Button
                            className="w-full sm:w-auto px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-900 rounded-lg font-medium transition-all"
                            onClick={() => generateCSV(messages)}
                        >
                            Export to CSV
                        </Button>
                    </div>
                </CardHeader>

            </Card>
        </div>
    </>
);

export default MessageCountDisplay;
