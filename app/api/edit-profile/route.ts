import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const PUT = async (req: Request) => {
  try {
    await connectToDB();

    const { name, email, address } = await req.json();

    // Find the user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, address },
      { new: true, select: "-password" } // Exclude password from response
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
