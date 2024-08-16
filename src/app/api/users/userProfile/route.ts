import { connect } from "@/Database/connection";
import { tokenMiddleware } from "@/helpers/tokenMiddleware";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";

// ----------------------------------------------------
connect();
// ----------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const id = await tokenMiddleware();
    const userFound = await User.findById(id).select({
      password: 0,
      _id: 0,
    });

    return NextResponse.json(
      { userFound, message: "User Found Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
