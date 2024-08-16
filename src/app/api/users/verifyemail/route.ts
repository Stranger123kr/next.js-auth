import { connect } from "@/Database/connection";
import { emailVerificationMiddleware } from "@/helpers/emailMiddleware";
import User from "@/model/userModel";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// ----------------------------------------------------
connect();
// ----------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const { verification, userId } = await emailVerificationMiddleware();

    if (verification || userId) {
      const gotUser = await User.findById(userId);
      gotUser.isVerified = true;
      gotUser.save();
    }

    if (verification) {
      cookies().delete("emailVerify");
    }

    return NextResponse.json(
      {
        message: "Email Verified Successfully",
        success: true,
        verify: verification,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
