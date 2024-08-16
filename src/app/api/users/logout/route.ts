import { connect } from "@/Database/connection";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { tokenMiddleware } from "@/helpers/tokenMiddleware";
// ----------------------------------------------------
connect();
// ----------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    await tokenMiddleware(); // middleware for user verification

    cookies().delete("userToken");

    return NextResponse.json(
      { message: "User logout Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
