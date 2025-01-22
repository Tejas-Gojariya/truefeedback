import { NextResponse } from 'next/server';
import suggestMessages from "@/data/suggest-messages.json";

interface Message {
  id: string; // Adjust these fields to match the structure of your JSON messages
  text: string;
}

function getRandomMessages(messages: Message[], count: number): Message[] {
  const shuffled = messages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function POST() {
  try {
    const randomMessages = getRandomMessages(suggestMessages as unknown as Message[], 5);
    return NextResponse.json({ suggestions: randomMessages });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      {
        error: 'Error generating suggestions',
        details: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
