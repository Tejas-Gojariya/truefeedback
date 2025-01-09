import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, currentPassword, newPassword } = await request.json();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return Response.json(
                { success: false, message: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        return Response.json(
            { success: true, message: 'Password changed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error changing password:', error);
        return Response.json(
            { success: false, message: 'Error changing password' },
            { status: 500 }
        );
    }
}
