import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user = session?.user;

  // Check if user is authenticated
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Ensure the user has an ID
  if (!_user._id) {
    return Response.json(
      { success: false, message: 'User ID missing from session' },
      { status: 400 }
    );
  }

  // Convert user ID to MongoDB ObjectId
  let userId;
  try {
    userId = new mongoose.Types.ObjectId(_user._id);
  } catch (error) {
    return Response.json(
      { success: false, message: 'Invalid user ID' },
      { status: 400 }
    );
  }

  try {
    // Fetch the user's messages
    const user = await UserModel.findById(userId).select('messages').lean();

    // Check if user exists
    if (!user) {
      return Response.json(
        { success: false, message: 'User not found get-message' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, messages: user.messages || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}