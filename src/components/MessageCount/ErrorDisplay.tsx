interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => (
    <div>
        <p>{message}</p>
    </div>
);

export default ErrorDisplay;