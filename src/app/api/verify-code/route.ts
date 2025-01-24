import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { sendVerificationEmail } from '../../../helpers/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code, resendOtp } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (resendOtp) {
      const newCode = generateNewCode(); // Helper function to generate new OTP
      const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

      user.verifyCode = newCode;
      user.verifyCodeExpiry = expiryTime;
      await user.save();

      const emailResponse = await sendVerificationEmail(user.email, user.username, newCode);

      if (emailResponse.success) {
        return Response.json(
          { success: true, message: 'New OTP sent successfully' },
          { status: 200 }
        );
      } else {
        return Response.json(
          { success: false, message: emailResponse.message },
          { status: 500 }
        );
      }
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}

// Helper function to generate a new random code
function generateNewCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random code
}