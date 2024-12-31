import dayjs from "dayjs";

/**
 * Generates a CSV from the given messages and triggers a download.
 * @param {Array} messages - Array of message objects to include in the CSV.
 */
export const generateCSV = (messages) => {
  // Create the CSV headers
  const headers = ['ID', 'Content', 'Rating', 'Date'];

  // Prepare the data rows
  const rows = messages.map((message) => [
    message._id,
    message.content,
    message.rating,
    dayjs(message.createdAt).format('MMM D, YYYY h:mm A')
  ]);

  // Combine headers and rows into a CSV string
  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\n');

  // Create a blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create an anchor element to trigger the download
  const link = document.createElement('a');
  const fileName = `messages.csv`;

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
