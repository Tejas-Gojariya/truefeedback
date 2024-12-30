import { jsPDF } from 'jspdf';

/**
 * Generates a PDF from the given messages and downloads it.
 * @param {Array} messages - Array of message objects to include in the PDF.
 */
export const genratePDF = (messages) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('User Messages', 10, 10);

  // Adding content from messages
  let yOffset = 20; // Y-axis offset for each message
  messages.forEach((message, index) => {
    doc.setFontSize(12);
    doc.text(`Message ${index + 1}:`, 10, yOffset);
    doc.text(`ID: ${message._id}`, 10, yOffset + 10);
    doc.text(`Content: ${message.content}`, 10, yOffset + 20);
    doc.text(`Rating: ${message.rating}`, 10, yOffset + 30);
    yOffset += 40; // Increment offset
  });

  // Save the PDF
  doc.save('messages.pdf');
};
