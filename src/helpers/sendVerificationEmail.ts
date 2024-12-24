import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponce";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
) : Promise<ApiResponse>{
    try {
        await resend.email.send({
            from : 'onboarding@resend.dev',
            to : email,
            subject : 'MstryMessage | Verification code',
            react : VerificationEmail({username, otp: verifyCode})
        })

        return { success : true, message : 'Verification email send successfully' }
    } catch (emailError) {
        console.error("Error sending verfication email", emailError)

        return {
            success : false,
            message : "Failed to send verification email"
        }
    }
}