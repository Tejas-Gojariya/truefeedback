import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SupportModel from '@/model/Support';
import { supportSchema } from '@/schemas/supportSchema';
import { ZodError } from 'zod';

// Handle POST request
export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();

        // Validate request body using Zod
        const validatedData = supportSchema.parse(body);

        // Create a new support entry
        const newSupport = await SupportModel.create(validatedData);

        return NextResponse.json({ success: true, data: newSupport }, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

// Handle GET request (optional, if you want to retrieve all support messages)
export async function GET() {
    try {
        await dbConnect();
        const messages = await SupportModel.find();
        return NextResponse.json({ success: true, data: messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
