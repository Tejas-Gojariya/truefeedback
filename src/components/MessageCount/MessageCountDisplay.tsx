'use client'
interface MessageCountDisplayProps {
    count: number;
}

const MessageCountDisplay = ({ count }: MessageCountDisplayProps) => (
    <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">{count}</p>
        <p className="text-gray-500">Messages in your account</p>
    </div>
);

export default MessageCountDisplay;
