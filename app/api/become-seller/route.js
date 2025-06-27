import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "You're not Authorized",
      });
    }

    const { organization } = await request.json();
    console.log(organization);

    if(!organization || organization.trim() === ''){
        return NextResponse.json({
        success: false,
        message: "Organization Name required",
      });
    }

    const response = await fetch(
      `https://api.clerk.com/v1/users/${userId}/metadata`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          public_metadata: {
            role: "seller",
            organization,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to update user metadata",
      });
    }

    return NextResponse.json({
      success: true,
      message: "You're Now Seller",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
