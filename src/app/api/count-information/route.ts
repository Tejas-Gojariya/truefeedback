import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // avgRating
    const ratingAggregation = await UserModel.aggregate([
      { $unwind: "$messages" }, // Deconstruct the `messages` array
      { $group: { _id: null, totalRating: { $sum: "$messages.rating" }, count: { $sum: 1 } } } // Sum ratings and count messages
    ]);

    const totalRating = ratingAggregation[0]?.totalRating || 0;
    const count = ratingAggregation[0]?.count || 0;
    const avgRating = count > 0 ? totalRating / count : 0;
    const satisfactionPercentage = Math.round((avgRating / 5) * 100);

    let satisfactionCategory = "Average";
    if (avgRating >= 3 && avgRating < 4) {
      satisfactionCategory = "Good";
    } else if (avgRating >= 4) {
      satisfactionCategory = "Excellent";
    }

    // userCount
    const userCount = await UserModel.countDocuments({ isVerified: true });

    // review count
    const messageCountResult = await UserModel.aggregate([
      { $project: { messageCount: { $size: "$messages" } } },
      { $group: { _id: null, totalMessages: { $sum: "$messageCount" } } },
    ]);

    const totalMessages = messageCountResult[0]?.totalMessages || 0;

    return NextResponse.json({
      avgRating: avgRating.toFixed(2),
      satisfactionPercentage,
      satisfactionCategory,
      userCount,
      totalMessages,
    });

  } catch (error) {
    console.error("Error counting verified users:", error);
    return NextResponse.json(
      { error: "Failed to fetch the count of verified users" },
      { status: 500 }
    );
  }
}
