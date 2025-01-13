import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    await dbConnect();

    const session = await getSession({ req });

    if (!session || !session.user?._id) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { socialLinks } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(
            session.user._id,
            { socialLinks },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        res.status(200).json({ success: true, message: 'Social links updated successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}